import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DiscussionService} from '../../services/discussion.service';

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit {

  discussionId: string;
  discussion: any;
  replies: any[]
  constructor(private route:ActivatedRoute,private discussionService: DiscussionService) { }
  
  ngOnInit() {
    this.discussionId = this.route.snapshot.params['id'];
    this.getDiscussion()
  }

  getDiscussion(){
    this.discussionService.getDiscussion(this.discussionId).subscribe( (response:any) =>{
      if(response.data.discuss){
        this.discussion = response.data.discuss;
        this.replies = response.data.replies;
      }
    });
  }
}