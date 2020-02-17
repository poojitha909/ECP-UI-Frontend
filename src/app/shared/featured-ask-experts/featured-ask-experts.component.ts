import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from 'src/app/features/ask-question/services/ask-question.service';
import { AppConstants } from 'src/app/app.constants';
import { StorageHelperService } from 'src/app/core/services';
import { Router } from '@angular/router';

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

  constructor(
    private askQuestionService: AskQuestionService,
    private storageHelper: StorageHelperService,
    private router: Router
  ) { }

  ngOnInit() {
    const featuredExpertSession = this.storageHelper.retrieveSession(AppConstants.FEATURED_EXPERT);
    if (featuredExpertSession) {
      this.searchParams.experties = featuredExpertSession;
    }
    this.initiate();
  }

  initiate() {
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

  seeAllExperts() {
    this.storageHelper.storeSession(AppConstants.FEATURED_EXPERT, this.searchParams.experties);
    this.router.navigate(["/ask-question/all"], { queryParams: { category: this.searchParams.experties } });
  }
}
