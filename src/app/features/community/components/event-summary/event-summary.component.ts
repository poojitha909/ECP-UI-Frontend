import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {

  @Input() event: any;
  @Input() isPast: number;

  constructor() { }
  ngOnInit() {
  }
}