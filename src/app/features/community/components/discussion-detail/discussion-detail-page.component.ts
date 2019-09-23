import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router"
import {DiscussionService} from '../../services/discussion.service';
import {MenuService} from '../../services/menu.service';
import {StorageHelperService} from "../../../../core/services/storage-helper.service";
import {AuthService} from "../../../../core/auth/services/auth.service";

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit {

  discussionId: string;
  commentTxt: string;
  category: string;
  categoryName: string;
  discussion: any;
  urltxt:string;
  replies: any[];
  user: any;
  replyId: string;
  replyParentUser: string;
  replyParentText: string;

  constructor(private router: Router,private route:ActivatedRoute,private discussionService: DiscussionService, private menuService: MenuService, private store: StorageHelperService, private authService: AuthService) { }
  
  ngOnInit() {
    this.discussionId = this.route.snapshot.params['id'];
    this.categoryName = "";
    if(this.route.snapshot.params['category']){
      this.category = this.route.snapshot.params['category'];
    }
    this.commentTxt = "";
    this.replyId = "";
    this.replyParentText = "";
    this.replyParentUser = "";
    this.user = this.store.retrieve("ECP-USER");
    let comment = this.store.retrieve("new-d-comment");
    if(comment){
      comment = JSON.parse(comment); 
      this.discussionId = comment.discussionId;
      this.commentTxt = comment.commentTxt;
      this.category = comment.category;
      this.store.clear("new-d-comment");
    }
    this.getDiscussion();
  }

  addComment(){
    if(!this.user){
      this.store.store("new-d-comment",JSON.stringify({discussionId: this.discussionId, commentTxt: this.commentTxt, category: this.category}));
      this.authService.redirectUrl = "community/discussion/"+ this.discussionId +  (this.category ? "/" + this.category : "");
      this.router.navigate(['/user/signin']);
      return;
    }
    if(this.commentTxt !=""){
      this.discussionService.addComment( {type:0}, this.discussionId, this.replyId, this.commentTxt).subscribe( (response:any) =>{
        if(response.data.replies){
          this.commentTxt = "";
          let replies = response.data.replies;
          this.setReplies(replies);
        }
      });
    }
    else{
      alert("Please write comment first!");
    }
  }

  recursiveReplies(reply,parentText,parentUser){
    reply.parentText = parentText;
    reply.parentUser = parentUser;
    this.replies[this.replies.length] = reply;

    if(reply.replies && reply.replies.length > 0){
      for(let rep of reply.replies){
        this.recursiveReplies(rep,reply.text,reply.userName);
      }
    }
  }

  likeDiscussion(){
    this.discussionService.likeDiscussionReply(this.discussionId).subscribe( (response:any) =>{
      if(response.data.id){
        this.discussion.aggrLikeCount = response.data.aggrLikeCount;
      }
    });
  }
  likeReply(reply){
    this.discussionService.likeReply(this.discussionId,reply.id).subscribe( (response:any) =>{
      if(response.data.id){
        for(let idx in this.replies){
          if(this.replies[idx].id === response.data.id){
            this.replies[idx] = response.data;
          }
        }
      }
    });
  }
  getDiscussion(){
    if(this.category!=""){
      this.menuService.getMenuItem(this.category).subscribe( (response:any) =>{
        if(response[0]){
          this.categoryName = response[0].displayMenuName;
        }
      });
    }

    this.discussionService.getDiscussion(this.discussionId).subscribe( (response:any) =>{
      if(response.data.discuss){
        this.discussion = response.data.discuss;
        let replies = response.data.replies;
        this.setReplies(replies);
      }
    });
  }

  setReplies(replies){
    this.replies = [];
    for(let ri in replies){
      this.recursiveReplies(replies[ri],"","");
    }
    this.replies.sort(  (a,b) => {  
      if (a['createdAt'] < b['createdAt']) {  
          return 1;  
      } else if (a['createdAt'] > b['createdAt']) {  
          return -1;  
      }  
      return 0;
    });
  }

  setReplyId(id,user,text){
    this.replyId = id;
    this.replyParentUser = user;
    this.replyParentText = text;
  }
}