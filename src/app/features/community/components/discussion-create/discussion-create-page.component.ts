import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DiscussionService} from '../../services/discussions.service';

@Component({
  selector: 'app-discussion-create-page',
  templateUrl: './discussion-create-page.component.html',
  styleUrls: ['./discussion-create-page.component.scss']
})
export class DiscussionCreatePageComponent implements OnInit {

  discussId: string;
  discuss: any;
  constructor(private route:ActivatedRoute,private discussionService: DiscussionService) { }
  
  ngOnInit() {
    this.discussId = this.route.snapshot.params['id'];
  }
}