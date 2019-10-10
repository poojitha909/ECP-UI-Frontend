import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AskQuestionService} from '../../services/ask-question.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";

declare var UIkit;

@Component({
  selector: 'expert-all-question',
  templateUrl: './expert-all-question.component.html',
  styleUrls: ['./expert-all-question.component.scss']
})
export class ExpertAllQuestionComponent implements OnInit, OnDestroy {

  showReset: boolean;
  unanswered: any[];
  questions: any[];
  catsList: any[];
  viewby: string;
  user: any;
  searchParams: {
    p: number,
    s: number,
    askCategory: string,
    askedBy: string,
    answered: number,
		answeredBy: string
  };
  searchParamsQues: {
    p: number,
    s: number,
    searchTxt: string,
    askCategory: string,
    askedBy: string,
    answered: number,
		answeredBy: string
  };
  paramsSubs: any;
  totalRecords: number;
  totalRecordsQues: number;
  constructor(private route:ActivatedRoute, private router: Router, private store: StorageHelperService, private askQuesService: AskQuestionService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 10,
      askCategory: "",
      askedBy: "",
      answered:0,
      answeredBy: ""
    }
    this.searchParamsQues = {
      p: 0,
      s: 10,
      searchTxt: "",
      askCategory: "",
      askedBy: "",
      answered:1,
      answeredBy: ""
    };

    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    }); 
  }

  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }
  
  initiate(){
    this.viewby = "expert";
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
      this.searchParams.answeredBy = this.user.id;
      this.searchParamsQues.answeredBy = this.user.id;
    }
    this.searchParams = {
      p: 0,
      s: 10000,
      askCategory: "",
      askedBy: "",
      answered: 0,
      answeredBy: ""
    }

    this.searchParamsQues = {
      p: 0,
      s: 1000,
      searchTxt: "",
      askCategory: "",
      askedBy: "",
      answered: 1,
      answeredBy: ""
    };
    
    this.totalRecords = 0;
    this.totalRecordsQues = 0;
    if(this.route.snapshot.queryParams['category'] !== undefined){
      this.searchParams.askCategory = this.route.snapshot.queryParams['category'];
      this.searchParamsQues.askCategory = this.route.snapshot.queryParams['category'];
    }
    
    this.askQuesService.getCategoryList().subscribe( (response:any) =>{
      const data = response.data;
      this.catsList = [];
      if(data.content){
        this.catsList = data.content;
      }
    });
    this.onSearch();
    setTimeout( ()=> {
      if(this.route.snapshot.queryParams['tab']){
        UIkit.tab("#questionstab").show(this.route.snapshot.queryParams['tab']);
      }
    },500);
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }

  changePageQues(page: number) {
    this.searchParamsQues.p = page;
    this.onSearch()
  }

  showUnanswered(){
    this.askQuesService.questions(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.unanswered = [];
      if(data.content){
        this.unanswered = data.content;
        this.totalRecords = data.total;
      }
    });
  }
  showQuestions(){
    this.askQuesService.questions(this.searchParamsQues).subscribe( (response:any) =>{
      const data = response.data;
      this.questions = [];
      if(data.content){
        this.questions = data.content;
        this.totalRecordsQues = data.total;
      }
    });
  }

  onTopTabChange(value) {
    this.router.navigate(['/ask-question/expert'], {queryParams: {tab: value} });
  }
  
  onSearch() {
    this.showUnanswered();
    this.showQuestions();
  }
}