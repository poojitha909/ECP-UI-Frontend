import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-summary',
  templateUrl: './discussion-summary.component.html',
  styleUrls: ['./discussion-summary.component.scss']
})
export class DiscussionSummaryComponent implements OnInit {

  @Input() category: any;

  constructor() { }
    ngOnInit() { }
}