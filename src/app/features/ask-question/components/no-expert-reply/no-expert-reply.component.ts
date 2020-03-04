import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-expert-reply',
  templateUrl: './no-expert-reply.component.html',
  styleUrls: ['./no-expert-reply.component.scss']
})
export class NoExpertReplyComponent implements OnInit {
  @Input() isExpert: boolean;

  constructor() { }
    ngOnInit() {
  }
}