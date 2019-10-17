import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router"
import { DiscussionService } from '../../services/discussion.service';
import { MenuService } from '../../services/menu.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit {

  breadcrumbLinks: Breadcrumb[];

  discussionId: string;
  category: string;
  categoryName: string;
  discussion: any;
  urltxt: string;
  replies: any[];
  user: any;
  replyId: string;
  replyParentUser: string;
  replyParentText: string;
  replyForm: FormGroup;
  successMessage: String;

  constructor(private router: Router, private route: ActivatedRoute, 
    private discussionService: DiscussionService, private menuService: MenuService, 
    private fb: FormBuilder, private store: StorageHelperService,
    private authService: AuthService) { }

  ngOnInit() {
    this.discussionId = this.route.snapshot.params['id'];
    this.successMessage = "";
    this.breadcrumbLinks = [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Community',
        link: '/community'
      },
      {
        text: 'All Articles & Discussions',
        link: '/community/discussions'
      }
    ];
    this.categoryName = "";
    if (this.route.snapshot.params['category']) {
      this.category = this.route.snapshot.params['category'];
    }
    this.replyId = "";
    this.replyParentText = "";
    this.replyParentUser = "";
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    let comment = this.store.retrieve("new-d-comment");
    if (comment) {
      comment = JSON.parse(comment);
      this.discussionId = comment.discussionId;
      this.category = comment.category;
      this.replyId = comment.replyId;
      this.replyParentText = comment.replyParentText;
      this.replyParentUser = comment.replyParentUser;
      this.store.clear("new-d-comment");
    }
    this.replyForm =  this.fb.group({
      commentTxt: [ comment ? comment.commentTxt : "" ,Validators.required]
    });
    this.getDiscussion();
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
      this.store.store("new-d-comment", 
      JSON.stringify({ 
          discussionId: this.discussionId, 
          category: this.category,
          replyId: this.replyId,
          replyParentText: this.replyParentText,
          replyParentUser: this.replyParentUser,
          commentTxt: comment.commentTxt
         }));
      this.authService.redirectUrl = "community/discussion/" + this.discussionId + (this.category ? "/" + this.category : "");
      this.router.navigate(['/user/signin']);
      return;
    }
    this.discussionService.addComment({ type: 0 }, this.discussionId, this.replyId, comment.commentTxt).subscribe((response: any) => {
      if (response.data.replies) {
        this.replyForm.reset();
        this.successMessage = "Reply Submitted successfully.";
        let replies = response.data.replies;
        this.setReplies(replies);
      }
    });
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

  likeDiscussion() {
    this.discussionService.likeDiscussionReply(this.discussionId).subscribe((response: any) => {
      if (response.data.id) {
        this.discussion.aggrLikeCount = response.data.aggrLikeCount;
      }
    });
  }
  likeReply(reply) {
    this.discussionService.likeReply(this.discussionId, reply.id).subscribe((response: any) => {
      if (response.data.id) {
        for (let idx in this.replies) {
          if (this.replies[idx].id === response.data.id) {
            this.replies[idx] = response.data;
          }
        }
      }
    });
  }
  getDiscussion() {
    if (this.category != "") {
      this.menuService.getMenuItem(this.category).subscribe((response: any) => {
        if (response[0]) {
          this.categoryName = response[0].displayMenuName;
          this.breadcrumbLinks.push({
            text: this.categoryName,
            link: ['/community/discussions'],
            queryParams: { category: this.category }
          });
        }
      });
    }

    this.discussionService.getDiscussion(this.discussionId).subscribe((response: any) => {
      if (response.data.discuss) {
        this.discussion = response.data.discuss;
        let replies = response.data.replies;
        this.setReplies(replies);
      }
    });
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
  get formControl() {
    return this.replyForm.controls;
  }
}