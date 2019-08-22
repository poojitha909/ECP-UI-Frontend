import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-no-record',
  templateUrl: './discussion-no-record.component.html',
  styleUrls: ['./discussion-no-record.component.scss']
})
export class DiscussionNoRecordComponent implements OnInit {

  @Input() discussion: any;

  constructor() { }
    ngOnInit() {
  }
}