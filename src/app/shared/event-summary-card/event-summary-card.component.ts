import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-summary-card',
  templateUrl: './event-summary-card.component.html',
  styleUrls: ['./event-summary-card.component.scss']
})
export class EventSummaryCardComponent implements OnInit {

 
  @Input() event: any;
  @Input() isPast: number;

  constructor() { }
  ngOnInit() {
  }
}
