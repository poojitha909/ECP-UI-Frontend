import { Component, OnInit, OnDestroy } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageHelperService } from 'src/app/core/services/storage-helper.service';
import { SEO } from 'src/app/core/interfaces';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-ask-question-page',
  templateUrl: './ask-question-page.component.html',
  styleUrls: ['./ask-question-page.component.scss']
})
export class AskQuestionPageComponent implements OnInit, OnDestroy {

  showReset: boolean;
  expertsTotal: number;
  myQuesTotal: number;
  expertsQuesTotal: number;
  searchTxt: string;
  tempSearchTxt: string;
  expertCategory: string;
  showSharing: boolean;
  showPagination: boolean;
  user: any;
  paramsSubs: any;
  show: string;

  constructor
    (private route: ActivatedRoute,
      private router: Router,
      private store: StorageHelperService,
      private homeService: HomeService,
      private seoService: SeoService
    ) {
    // Generate meta tag 
    const config: SEO = {
      title: `Ask Our Expert - An Elder Spring Initiative by Tata Trusts`,
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

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.showPagination = true;
    this.showSharing = true;
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    this.searchTxt =  "";
    this.expertsTotal = 0;
    if (this.route.snapshot.params['expertCategory']) {
      this.expertCategory = this.route.snapshot.params['expertCategory'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchTxt ? true : false;
    }
    if(this.route.snapshot.queryParams['show']){
      this.show = this.route.snapshot.queryParams['show'];
      this.showAll(this.show); // experts, ques, expques
    }
    else{
      this.showAll("experts"); 
    }
    if (!this.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
  }

  showAll(tab) {
    this.show=tab;
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    this.show = "experts";
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    
    if (event.key == "Enter" || value=="") {
      this.setSearchTxt(value);
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    this.setSearchTxt(this.tempSearchTxt);
    this.router.navigate(['/ask-question'], { queryParams: { expertCategory: this.expertCategory, searchTxt: this.searchTxt, show: this.show } });
  }

  setSearchTxt(value: string) {
    this.searchTxt = value;
    this.tempSearchTxt = value;
    this.homeService.homeSearchtxt = value;
  }

  showExpertCount(value: number){
    this.expertsTotal = value;
  }
  showMyQuesCount(value: number){
    this.myQuesTotal = value;
  }
  showExpertQuesCount(value: number){
    this.expertsQuesTotal = value;
  }
}