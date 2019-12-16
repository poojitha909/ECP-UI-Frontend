import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-detail-card',
  templateUrl: './question-detail-card.component.html',
  styleUrls: ['./question-detail-card.component.scss']
})
export class QuestionDetailCardComponent implements OnInit {
  @Input() question: any;
  @Input() viewby: string;
  constructor() { }

  ngOnInit() {
    if(!this.viewby){
      this.viewby="user";
    }
  }

}
