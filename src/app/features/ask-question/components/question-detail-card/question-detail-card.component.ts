import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-detail-card',
  templateUrl: './question-detail-card.component.html',
  styleUrls: ['./question-detail-card.component.scss']
})
export class QuestionDetailCardComponent implements OnInit {
  @Input() question: any;
  @Input() viewby: string;
  constructor(private route:Router) { }

  ngOnInit() {
    if(!this.viewby){
      this.viewby="user";
    }
  }
  cardClick(e,card){
    e.stopPropagation();
    console.log(card)
    this.route.navigate(['/ask-question/'],{
       queryParams:{category:card.id, show: "expert"}
    })
  }

}
