import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AskQuestionService} from '../../services/ask-question.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { Breadcrumb } from 'src/app/core/interfaces';

declare var UIkit;

@Component({
  selector: 'all-ask-question',
  templateUrl: './all-ask-question.component.html',
  styleUrls: ['./all-ask-question.component.scss']
})
export class AllAskQuestionComponent implements OnInit, OnDestroy {
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
  searchParams: {
    p: number,
    s: number,
    experties: string
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
  constructor(private route:ActivatedRoute, private router: Router, private store: StorageHelperService, private askQuesService: AskQuestionService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 10,
      experties: ""
    }
    this.searchParamsQues = {
      p: 0,
      s: 10,
      searchTxt: "",
      askCategory: "",
      askedBy: "",
      answeredBy: ""
    };

    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    }); 
  }

  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }
  
  initiate(){
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
      this.searchParamsQues.askedBy = this.user.id;
    }
    this.searchParams = {
      p: 0,
      s: 10000,
      experties: ""
    }

    this.searchParamsQues = {
      p: 0,
      s: 1000,
      searchTxt: "",
      askCategory: "",
      askedBy: "",
      answeredBy: ""
    };
    
    this.totalRecords = 0;
    this.totalRecordsQues = 0;
    if(this.route.snapshot.params['category'] !== undefined){
      this.searchParams.experties = this.route.snapshot.params['category'];
      this.searchParamsQues.askCategory = this.route.snapshot.params['category'];
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
      if(this.route.snapshot.params['tab']){
        UIkit.tab("#questionstab").show(this.route.snapshot.params['tab']);
      }
    },500);
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }
  clearSelection(){
    this.searchParamsQues.askCategory = '';
    this.router.navigateByUrl('ask-question/all');
  }

  showExperts(){
    this.askQuesService.experts(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.experts = [];
      if(data.content){
        this.experts = data.content;
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

  onTabChange(value) {
    this.router.navigate(['/ask-question/all', {category: value}]);
  }

  onTopTabChange(value) {
    this.router.navigate(['/ask-question/all', {category: this.searchParamsQues.askCategory, tab: value}]);
  }
  
  onSearch() {
    this.showExperts();
    this.showQuestions();
  }
}