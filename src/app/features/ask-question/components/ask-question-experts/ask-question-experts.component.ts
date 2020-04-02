import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AskQuestionService } from '../../services/ask-question.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
import { UserService } from '../../../../features/user/services/user.service';

declare var UIkit;

@Component({
  selector: 'ask-question-experts',
  templateUrl: './ask-question-experts.component.html',
  styleUrls: ['./ask-question-experts.component.scss']
})
export class AskQuestionExpertsComponent implements OnInit, OnDestroy {
  @Output() showCount: EventEmitter<number> = new EventEmitter();
  showReset: boolean;
  experts: any[];
  catsList: any[];
  user: any;
  searchParams: {
    p: number,
    s: number,
    experties: string,
    searchTxt: string
  };
  paramsSubs: any;
  totalRecords: number;
  currentUrl: string;
  whatsappUrl;
  initial:number;
  final:number

  constructor(private route: ActivatedRoute, private router: Router,
    private store: StorageHelperService, private askQuesService: AskQuestionService,
    public sanitizer: DomSanitizer, private seoService: SeoService,
    private userService: UserService, private homeService: HomeService) {

    // Generate meta tag 
    const config: SEO = {
      title: `All Experts - An Elder Spring Initiative by Tata Trusts`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Ask-320.png`,
    }

    this.seoService.generateTags(config);

  }

  ngOnInit() {
    this.currentUrl = this.currentUrl = encodeURI(window.location.href);
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
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

    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    
    this.totalRecords = 0;
    if (this.route.snapshot.queryParams['category'] !== undefined) {
      this.searchParams.experties = this.route.snapshot.queryParams['category'];
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
    this.askQuesService.getCategoryListFilter(this.searchParams.searchTxt).subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content.filter( c => (c.show == true));
      }
    });
    
    
    this.showExperts();
  }

  
  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }

  clearSelection() {
    this.searchParams.experties = '';
    this.router.navigate(['/ask-question'], { queryParams: { show:"experts" } });
  }

  showExperts() {
    this.askQuesService.experts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.experts = [];
      if (data.content) {
        this.experts = data.content;
        this.totalRecords = data.total;
        this.showCount.emit(this.totalRecords);

      this.initial = this.searchParams.p * this.searchParams.s + 1;
      this.final = this.initial + this.experts.length - 1
      


      }
    });
  }
  
  onTabChange(value) {
    this.router.navigate(['/ask-question'], { queryParams: { category: value, searchTxt: this.searchParams.searchTxt, show:"experts" } });
  }
  
  onSearch() {
    this.router.navigate(['/ask-question'], { queryParams: { category: this.searchParams.experties, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p, show:"experts"} });
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

  setSearchTxt(value: string){
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
    this.searchParams.p = 0;
  }
}