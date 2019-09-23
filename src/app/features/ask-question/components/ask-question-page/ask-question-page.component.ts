import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ask-question-page',
  templateUrl: './ask-question-page.component.html',
  styleUrls: ['./ask-question-page.component.scss']
})
export class AskQuestionPageComponent implements OnInit {

  showReset: boolean;
  experts: any[];
  catsList: any[];
  selCategory: string;
  searchParams: {
    p: number,
    s: number,
    experties: string
  };
  

  constructor(private route:ActivatedRoute, private askQuestionService: AskQuestionService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 3,
      experties: ""
    }
    this.showExperts();
    this.selCategory = "";
    if(this.route.snapshot.params['category']){
      this.selCategory = this.route.snapshot.params['category'];
    }
    this.askQuestionService.getCategoryList().subscribe( (response:any) =>{
      const data = response.data;
      this.catsList = [];
      if(data.content){
        this.catsList = data.content;
      }
    });
  }

  showExperts() {
    this.askQuestionService.experts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.experts = [];
      if (data.content) {
        this.experts = data.content;
        console.log(this.experts);
      }
    });
  }

  onTabChange(value: string) {
    this.selCategory = value;
    this.searchParams.experties = this.selCategory;
    this.onSearch();
  }

  onSearch() {
    this.showExperts();
  }
}