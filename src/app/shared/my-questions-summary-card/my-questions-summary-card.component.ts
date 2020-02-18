import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-questions-summary-card',
  templateUrl: './my-questions-summary-card.component.html',
  styleUrls: ['./my-questions-summary-card.component.scss']
})
export class MyQuestionsSummaryCardComponent implements OnInit {


  @Input() question: any;
  @Input() category: string;

  constructor() { }

  ngOnInit() {
  }

}
