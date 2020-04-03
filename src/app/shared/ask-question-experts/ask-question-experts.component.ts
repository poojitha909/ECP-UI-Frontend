import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AskQuestionService } from '../../features/ask-question/services/ask-question.service';
import { StorageHelperService } from "../../core/services/storage-helper.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
import { UserService } from '../../features/user/services/user.service';

declare var UIkit;

@Component({
  selector: 'ask-question-experts',
  templateUrl: './ask-question-experts.component.html',
  styleUrls: ['./ask-question-experts.component.scss']
})
export class AskQuestionExpertsComponent implements OnInit, OnDestroy {
  @Output() showCount: EventEmitter<number> = new EventEmitter();
  experts: any[];
  catsList: any[];
  user: any;
  @Input() searchTxt: string;
  @Input() showPagination: boolean;
  @Input() showSharing: boolean;
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
  
  constructor(private route: ActivatedRoute, private router: Router,
    private store: StorageHelperService, private askQuesService: AskQuestionService,
    public sanitizer: DomSanitizer, private homeService: HomeService) {
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
    if(this.searchTxt){
      this.searchParams.searchTxt = this.searchTxt;
    }
    if (this.route.snapshot.queryParams['expertCategory'] !== undefined) {
      this.searchParams.experties = this.route.snapshot.queryParams['expertCategory'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
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
    if(this.showPagination){
        this.router.navigate(['/ask-question'], { queryParams: { expertCategory: this.searchParams.experties, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p } });
    }
    else{
        this.showExperts();
    }
  }

  clearSelection() {
    this.searchParams.experties = '';
    this.searchParams.p = 0;
    if(this.showPagination){
      this.router.navigate(['/ask-question'], { queryParams: { searchTxt: this.searchParams.searchTxt, show:"experts" } });
    }
    else{
        this.showExperts();
    }
  }

  showExperts() {
    this.askQuesService.experts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.experts = [];
      if (data.content) {
        this.experts = data.content;
        this.totalRecords = data.total;
        this.showCount.emit(this.totalRecords);
      }
    });
  }
  
  onTabChange(value) {
    this.searchParams.experties = value;
    if(this.showPagination){
      this.router.navigate(['/ask-question'], { queryParams: { expertCategory: this.searchParams.experties, searchTxt: this.searchParams.searchTxt, show:"experts" } });
    }
    else{
        this.showExperts();
    }
  }
}