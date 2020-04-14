import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-detail-card',
  templateUrl: './question-detail-card.component.html',
  styleUrls: ['./question-detail-card.component.scss']
})
export class QuestionDetailCardComponent implements OnInit {
  @Input() question: any;
  @Input() viewby: string;
  @Input() pageParam: Object;
  @Output() categoryChange: EventEmitter<string> = new EventEmitter();

  constructor(private route:Router) { }

  ngOnInit() {
    if(!this.viewby){
      this.viewby="user";
    }
  }
  cardClick(e,card){
    e.stopPropagation();
    this.categoryChange.emit(card.id);
  }

}
