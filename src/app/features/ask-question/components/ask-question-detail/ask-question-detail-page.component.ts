import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
declare var UIkit;
@Component({
  selector: 'app-ask-question-detail-page',
  templateUrl: './ask-question-detail-page.component.html',
  styleUrls: ['./ask-question-detail-page.component.scss']
})
export class AskQuestionDetailPageComponent implements OnInit {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Ask an Expert',
      link: '/ask-question'
    },
    {
      text: 'All Experts',
      link: '/ask-question/all'
    }
  ];
  questionId: string;
  commentTxt: string;
  category: string;
  question: any;
  urltxt: string;
  replies: any[];
  user: any;
  replyId: string;
  replyForm: FormGroup;
  replyParentUser: string;
  replyParentText: string;
  askedByProfile: any;
  isExpert: boolean;

  constructor(private router: Router, private route: ActivatedRoute, 
    private askQuesService: AskQuestionService, 
    private store: StorageHelperService, 
    private fb: FormBuilder, 
    private authService: AuthService) { }

  ngOnInit() {
    this.questionId = this.route.snapshot.params['id'];
    if (this.route.snapshot.params['category']) {
      this.category = this.route.snapshot.params['category'];
    }
    this.commentTxt = "";
    this.replyId = "";
    this.replyParentText = "";
    this.replyParentUser = "";
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
      this.isExpert = false;
      if (this.user.userRoleId == "EXPERT") {
        this.isExpert = true;
      }
    }

    if(this.questionId == "preview"){
      this.question = this.store.retrieve("new-question-preview");
      this.question = JSON.parse(this.question);
      console.log(this.question);
    }

    let comment = this.store.retrieve("new-ques-comment");
    if (comment) {
      comment = JSON.parse(comment);
      this.questionId = comment.questionId;
      this.commentTxt = comment.commentTxt;
      this.category = comment.category;
      this.store.clear("new-ques-comment");
    }

    this.replyForm =  this.fb.group({
      commentTxt: [ comment ? comment.commentTxt : "" ,Validators.required]
    });

    this.getQuestion();
  }

  addComment() {
    Object.keys(this.replyForm.controls).forEach(field => {
      const control = this.replyForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let comment = {...this.replyForm.value};
    if (!this.replyForm.valid) {
      return;
    }
    if (!this.user) {
      this.store.store("new-ques-comment", JSON.stringify({ questionId: this.questionId, commentTxt: comment.commentTxt, category: this.category }));
      this.authService.redirectUrl = "ask-question/detail/" + this.questionId;
      UIkit.modal("#reply-modal").hide();
      this.replyForm.reset();
      this.router.navigate(['/user/signin']);
      return;
    }
    else if (comment.commentTxt != "") {
      this.askQuesService.addComment(this.questionId, comment.commentTxt, this.user).subscribe((response: any) => {
        if (response.data.reply) {
          this.commentTxt = "";
          UIkit.modal("#reply-modal").hide();
          this.askQuesService.getAskQuesReplies(this.question.id).subscribe((response: any) => {
            if (response.data) {
              this.replyForm.reset();
              this.setReplies(response.data.content);
            }
          });
        }
      });
    }
    else {
      alert("Please write comment first!");
    }
  }

  recursiveReplies(reply, parentText, parentUser) {
    reply.parentText = parentText;
    reply.parentUser = parentUser;
    this.replies[this.replies.length] = reply;

    if (reply.replies && reply.replies.length > 0) {
      for (let rep of reply.replies) {
        this.recursiveReplies(rep, reply.text, reply.userName);
      }
    }
  }



  getQuestion() {
    if(this.questionId == "preview"){
      this.askQuesService.getUserProfile(this.question.answeredBy.id).subscribe((response: any) => {
        if (response.data) {
          this.question.answeredBy = response.data;
        }
      });
    }
    else{
      this.askQuesService.getAskQuestion(this.questionId).subscribe((response: any) => {
        if (response.data) {
          this.question = response.data;
        }
        this.askQuesService.getAskQuesReplies(this.question.id).subscribe((response: any) => {
          if (response.data) {
            this.setReplies(response.data.content);
          }
        });
        this.askQuesService.getUserProfileById(this.question.askedBy.id).subscribe((response: any) => {
          if (response.data) {
            this.askedByProfile = response.data;
          }
        });
      });
    }
  }

  setReplies(replies) {
    this.replies = [];
    for (let ri in replies) {
      this.recursiveReplies(replies[ri], "", "");
    }
    this.replies.sort((a, b) => {
      if (a['createdAt'] < b['createdAt']) {
        return 1;
      } else if (a['createdAt'] > b['createdAt']) {
        return -1;
      }
      return 0;
    });
  }

  setReplyId(id, user, text) {
    this.replyId = id;
    this.replyParentUser = user;
    this.replyParentText = text;
  }

  onCancelPublish(){
    this.router.navigate(["ask-question/add"],{ queryParams: { category: this.question.category, answeredBy: this.question.answeredBy.id } });
  }

  onPublish(){
    if(!this.user) {
      this.authService.redirectUrl = "ask-question/details/preview";
      this.router.navigate(['/user/signin']);
      return;
    }
    this.askQuesService.addQuestion({
        question: this.question.question,
        description: this.question.description,
        askCategory: { id: this.question.askCategory.id },
        answeredBy: { id: this.question.answeredBy.id },
        askedBy: { id: this.question.askedBy.id }
      }).subscribe((response: any) => {
        if (response.data.id != "") {
          this.store.clear("new-question");
          this.store.clear("new-question-preview");
          this.router.navigate(['/ask-question']);
        }
        else {
          alert("Oops! something wrong happen, please try again.");
        }
      });
  }
}