import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-summary-cat',
  templateUrl: './discussion-summary-cat.component.html',
  styleUrls: ['./discussion-summary-cat.component.scss']
})
export class DiscussionSummaryCatComponent implements OnInit {

  @Input() discussion: any;

  constructor() { }
    ngOnInit() {
  }
}