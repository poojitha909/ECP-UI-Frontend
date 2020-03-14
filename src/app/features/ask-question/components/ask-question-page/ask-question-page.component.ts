import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
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
 
  showAllQues: any;

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

  @HostListener('window:scroll', ['$event'])
  hideBanner() {
    if (window.scrollY > 380) {
      document.getElementById('askExpertBanner').style.display = 'none';
    }
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
      this.showExperts();
    }
    if(this.route.snapshot.queryParams['show'] == "ques"){
      this.showAllQues = "showAllMyQues";
    }
    else if(this.route.snapshot.queryParams['show'] == "expques"){
      this.showAllQues = "showAllExpertQues";
    }
    else{
      this.showAllQues = "showAllExperts";
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
      this.showExperts();
    }
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

  showAll(i) {
    this.showAllQues=i 

    //this.router.navigate(['/ask-question/experts'], { queryParams: { category: this.searchParams.experties, searchTxt: this.searchParams.searchTxt } });
  }
  // showAllMyQues() {
  //  // this.router.navigate(['/ask-question/myques']);
  // }
  // showAllExpertQues(){
  //   this.router.navigate(['/ask-question/expertques']);
  // }

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
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    //this.showExperts();
    this.router.navigate(['/ask-question'], { queryParams: { category: this.searchParams.experties, searchTxt: this.searchParams.searchTxt, show: "expert" } });
  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
}