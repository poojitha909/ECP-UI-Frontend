import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DiscussionService} from '../../services/discussion.service';
import {MenuService} from '../../services/menu.service';

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
  replies: any[]
  constructor(private route:ActivatedRoute,private discussionService: DiscussionService, private menuService: MenuService) { }
  
  ngOnInit() {
    this.discussionId = this.route.snapshot.params['id'];
    this.categoryName = "";
    if(this.route.snapshot.params['category']){
      this.category = this.route.snapshot.params['category'];
    }
    this.commentTxt = "";
    this.getDiscussion();
  }

  addComment(){
    if(this.commentTxt !=""){
      this.discussionService.addComment( {type:0}, this.discussionId, "", this.commentTxt).subscribe( (response:any) =>{
        if(response.data.replies){
          this.commentTxt = "";
          this.replies = response.data.replies;
        }
      });
    }
    else{
      alert("Please write comment first!");
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
        this.replies = response.data.replies;
      }
    });
  }
}