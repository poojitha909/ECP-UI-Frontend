import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from 'src/app/features/ask-question/services/ask-question.service';

@Component({
  selector: 'app-featured-ask-experts',
  templateUrl: './featured-ask-experts.component.html',
  styleUrls: ['./featured-ask-experts.component.scss']
})
export class FeaturedAskExpertsComponent implements OnInit {

  searchParams = {
    p: 0,
    s: 25,
    searchTxt: "",
    experties: ""
  }
  experts: any[] = [];

  constructor(private askQuestionService: AskQuestionService) { }

  ngOnInit() {
    this.showExperts();
  }

  showExperts() {
    this.askQuestionService.experts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.experts = [];
      if (data.content) {
        this.experts = data.content;
      }
    });
  }

}
