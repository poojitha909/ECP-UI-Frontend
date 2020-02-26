import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AskQuestionService } from '../../services/ask-question.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';

declare var UIkit;

@Component({
  selector: 'all-ask-question',
  templateUrl: './all-ask-question.component.html',
  styleUrls: ['./all-ask-question.component.scss']
})
export class AllAskQuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Ask an Expert',
      link: '/ask-question'
    }
  ];
  showReset: boolean;
  experts: any[];
  questions: any[];
  catsList: any[];
  user: any;
  topTabs: number;
  searchParams: {
    p: number,
    s: number,
    experties: string,
    searchTxt: string
  };
  searchParamsQues: {
    p: number,
    s: number,
    searchTxt: string,
    askCategory: string,
    askedBy: string,
    answeredBy: string
  };
  paramsSubs: any;
  totalRecords: number;
  totalRecordsQues: number;
  currentUrl: string;
  whatsappUrl;

  constructor(private route: ActivatedRoute, private router: Router,
    private store: StorageHelperService, private askQuesService: AskQuestionService,
    public sanitizer: DomSanitizer, private seoService: SeoService,
    private homeService: HomeService) {

    // Generate meta tag 
    const config: SEO = {
      title: `All Experts`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Ask-320.png`,
    }

    this.seoService.generateTags(config);

  }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
    document.getElementById("allexpertHeader").focus();
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 4,
      experties: "",
      searchTxt: ""
    }

    this.searchParamsQues = {
      p: 0,
      s: 4,
      searchTxt: "",
      askCategory: "",
      askedBy: "",
      answeredBy: ""
    };
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
      this.searchParamsQues.askedBy = this.user.id;
    }

    this.totalRecords = 0;
    this.totalRecordsQues = 0;
    if (this.route.snapshot.queryParams['category'] !== undefined) {
      this.searchParams.experties = this.route.snapshot.queryParams['category'];
      this.searchParamsQues.askCategory = this.route.snapshot.queryParams['category'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
      this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
    if (this.route.snapshot.queryParams['pageQ'] !== undefined) {
      this.searchParamsQues.p = this.route.snapshot.queryParams['pageQ'];
    }

    this.askQuesService.getCategoryList().subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content;
      }
    });
    this.showExperts();
    this.showQuestions();
    setTimeout(() => {
      if (this.route.snapshot.queryParams['tab']) {
        this.topTabs = this.route.snapshot.queryParams['tab'];
        UIkit.tab("#questionstab").show(this.route.snapshot.queryParams['tab']);
      }
    }, 500);
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }

  changeQuesPage(page: number) {
    this.searchParamsQues.p = page;
    this.router.navigate(['/ask-question/all'], { queryParams: { category: this.searchParamsQues.askCategory, pageQ: this.searchParamsQues.p, tab: this.topTabs } });
  }

  clearSelection() {
    this.searchParamsQues.askCategory = '';
    this.router.navigateByUrl('ask-question/all');
  }

  showExperts() {
    this.askQuesService.experts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.experts = [];
      if (data.content) {
        this.experts = data.content;
        this.totalRecords = data.total;
      }
    });
  }
  showQuestions() {
    this.askQuesService.questions(this.searchParamsQues).subscribe((response: any) => {
      const data = response.data;
      this.questions = [];
      if (data.content) {
        this.questions = data.content;
        this.totalRecordsQues = data.total;
      }
    });
  }

  onTabChange(value) {
    this.router.navigate(['/ask-question/all'], { queryParams: { category: value } });
  }

  onTopTabChange(value) {
    this.topTabs = value;
    this.router.navigate(['/ask-question/all'], { queryParams: { category: this.searchParamsQues.askCategory, tab: value } });
  }

  onSearch() {
    this.router.navigate(['/ask-question/all'], { queryParams: { category: this.searchParamsQues.askCategory, page: this.searchParams.p, tab: this.topTabs } });
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.setSearchTxt(value);
    if (event.key === "Enter") {
      this.showExperts();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
      this.showExperts();
    }
  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
    this.searchParams.p = 0;
  }
}