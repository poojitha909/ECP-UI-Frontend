import { Component, OnInit } from '@angular/core';
import { DiscussionService } from 'src/app/features/community/services/discussion.service';

@Component({
  selector: 'app-featured-discussions',
  templateUrl: './featured-discussions.component.html',
  styleUrls: ['./featured-discussions.component.scss']
})
export class FeaturedDiscussionsComponent implements OnInit {

  discussions: any[] = [];
  selCategory = "";
  searchParamsDiscussions = {
    p: 0,
    s: 25,
    searchTxt: "",
    tags: ""
  }
  constructor(private discussionService: DiscussionService) { }
  ngOnInit() {
    this.getDiscussions();
  }

  getDiscussions() {
    this.discussionService.searchDiscussions(this.searchParamsDiscussions).subscribe((response: any) => {
      const data = response.data;
      if (data.content) {
        this.discussions = data.content;
      }
    });
  }

}
