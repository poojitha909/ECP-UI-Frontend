import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageHelperService } from 'src/app/core/services/storage-helper.service';
import { SEO } from 'src/app/core/interfaces';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ask-question-page',
  templateUrl: './ask-question-page.component.html',
  styleUrls: ['./ask-question-page.component.scss']
})
export class AskQuestionPageComponent implements OnInit, AfterViewInit, OnDestroy {

  showReset: boolean;
  showResult: boolean;
  experts: any[];
  expertsTotal: number;
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    experties: string
  };
  user: any;
  paramsSubs: any;

  constructor
    (private route: ActivatedRoute,
      private router: Router,
      private store: StorageHelperService,
      private askQuestionService: AskQuestionService,
      private homeService: HomeService,
      private seoService: SeoService
    ) {
    // Generate meta tag 
    const config: SEO = {
      title: `Ask an Expert`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Ask-320.png`,
    }

    this.seoService.generateTags(config);
  }

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
    document.getElementById("askSearch").focus();
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
      // if (this.user.userRoleId == "EXPERT") {
      //   this.router.navigate(['/ask-question/expert']);
      // }
    }
    this.searchParams = {
      p: 0,
      s: 6,
      searchTxt: "",
      experties: ""
    }
    this.expertsTotal = 0;
    this.showResult = false;
    if (this.route.snapshot.params['category']) {
      this.searchParams.experties = this.route.snapshot.params['category'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
    this.showExperts();
  }

  showExperts() {
    this.showResult = false;
    if (this.searchParams.searchTxt != "") {
      this.showResult = true;
      let searchParams = JSON.parse(JSON.stringify(this.searchParams));
      searchParams.experties = "";
      this.askQuestionService.experts(searchParams).subscribe((response: any) => {
        const data = response.data;
        this.experts = [];
        if (data.content) {
          this.experts = data.content;
          this.expertsTotal = data.total;
        }
      });
    }
  }

  showAllExperts() {
    this.router.navigate(['/ask-question/all'], { queryParams: { category: this.searchParams.experties, searchTxt: this.searchParams.searchTxt, tab: 0 } });
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
      this.showResult = false;
    }
    this.setSearchTxt(value);
    if (event.key == "Enter") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    console.log("reset");
    // if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
      this.onSearch()
    // }
  }

  onSearch() {
    this.showExperts();
    document.getElementById("askSearch").focus();
  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
}