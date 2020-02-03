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
    s: 6,
    searchTxt: "",
    experties: ""
  }
  catsList: any[];
  experts: any[] = [];

  constructor(private askQuestionService: AskQuestionService) { }

  ngOnInit() {
    this.initiate();
  }

  initiate(){
    this.askQuestionService.getCategoryList().subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content;
      }
    });
    this.showExperts();
  }

  showExperts() {
    let searchParams = JSON.parse(JSON.stringify(this.searchParams));
    searchParams.searchTxt = "";
    this.askQuestionService.experts(searchParams).subscribe((response: any) => {
      const data = response.data;
      this.experts = [];
      if (data.content) {
        this.experts = data.content;
      }
    });
  }

}
