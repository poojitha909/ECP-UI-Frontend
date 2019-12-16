import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-ask-expert-summary-card',
  templateUrl: './ask-expert-summary-card.component.html',
  styleUrls: ['./ask-expert-summary-card.component.scss']
})
export class AskExpertSummaryCardComponent implements OnInit {

  @Input() expert: any;

  constructor() { }

  ngOnInit() {
  }

}
