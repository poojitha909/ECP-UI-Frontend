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
  selector: 'ask-question-myques',
  templateUrl: './ask-question-myques.component.html',
  styleUrls: ['./ask-question-myques.component.scss']
})
export class AskQuestionMyQuesComponent implements OnInit, OnDestroy {
  questions: any[];
  user: any;
  @Input() searchTxt: string;
  @Input() showPagination: boolean;
  @Input() showSharing: boolean;
  @Output() showCount: EventEmitter<number> = new EventEmitter();
  isLoading: boolean;
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    askCategory: string,
    askedBy: string,
    answeredBy: string
  };
  paramsSubs: any;
  totalRecords: number;
  
  constructor(private route: ActivatedRoute, private router: Router,
    private store: StorageHelperService, private askQuesService: AskQuestionService,
    public sanitizer: DomSanitizer) {
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
    this.searchParams = {
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
      this.searchParams.askedBy = this.user.id;
    }
    else{
      this.searchParams.askedBy = "no_user";
    }

    this.totalRecords = 0;
    if(this.searchTxt){
      this.searchParams.searchTxt = this.searchTxt;
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
      this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
    }
    this.showQuestions();
  }

  changePage(page: number){
    this.searchParams.p = page;
    if(this.showPagination){
        this.router.navigate(['/ask-question'], { queryParams: { page: this.searchParams.p, searchTxt: this.searchParams.searchTxt, show: "ques"} });
    }
    else{
        this.showQuestions();
    }
  }
  
  showQuestions() {
    this.isLoading = true;
    this.askQuesService.questions(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.questions = [];
      if (data.content) {
        this.questions = data.content;
        this.totalRecords = data.total;
        this.showCount.emit(this.totalRecords);
        this.isLoading = false;
      }
    });
  }

  onTabChange(value) {
    this.searchParams.askCategory = value;
    if(this.showPagination){
      this.router.navigate(['/ask-question'], { queryParams: { expertCategory: this.searchParams.askCategory, searchTxt: this.searchParams.searchTxt, show:"experts" } });
    }
    else{
        //this.showExperts(); need to fix this
    }
  }
}