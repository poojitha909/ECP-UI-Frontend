import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-summary-cat',
  templateUrl: './discussion-summary-cat.component.html',
  styleUrls: ['./discussion-summary-cat.component.scss']
})
export class DiscussionSummaryCatComponent implements OnInit {

  @Input() discussion: any;
  @Input() category: string;

  constructor() { }

  ngOnInit() { }

  /**
   * TODO: method to be removed
   */
  setDefaultPic(e) {
    e.target.src = "assets/images/default-thumbnail.png";
  }
}