import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AskQuestionService} from '../../features/ask-question/services/ask-question.service';
import { StorageHelperService } from "../../core/services/storage-helper.service";
import { UserService } from '../../features/user/services/user.service';
import { Breadcrumb } from 'src/app/core/interfaces';

@Component({
  selector: 'expert-all-question',
  templateUrl: './expert-all-question.component.html',
  styleUrls: ['./expert-all-question.component.scss']
})
export class ExpertAllQuestionComponent implements OnInit, OnDestroy {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'All Experts',
      link: '/ask-question'
    }    
  ];
  
  questions: any[];
  viewby: string;
  user: any;
  breadcrumb:boolean
  @Input() searchTxt: string;
  @Input() showPagination: boolean;
  @Input() showSharing: boolean;
  @Output() showCount: EventEmitter<number> = new EventEmitter();
  isLoading: boolean;
  searchParams: {
    p: number,
    s: number,
    askCategory: string,
    askedBy: string,
    answeredBy: string,
    searchTxt: string
  };
  paramsSubs: any;
  totalRecords: number;
  constructor(private route:ActivatedRoute, 
    private router: Router,
    private store: StorageHelperService,
    private askQuesService: AskQuestionService,
    private userService: UserService) { }

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.breadcrumb=params.breadcrumb
      this.initiate();
    }); 
  }

  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }
  
  initiate(){
    this.viewby = "expert";
    this.user = this.store.retrieve("ECP-USER");
    this.searchParams = {
      p: 0,
      s: 10000,
      askCategory: "",
      askedBy: "",
      answeredBy: "",
      searchTxt: ""
    }
    if(this.searchTxt){
      this.searchParams.searchTxt = this.searchTxt;
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
      this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
    if(this.route.snapshot.queryParams['show'] != 'expques'){
      this.searchParams.p = 0;
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
    }

    if(this.user){
      this.user = JSON.parse(this.user);
      this.isLoading = true;
      this.userService.getUserProfile().subscribe(
        userProfie => {
          this.searchParams.answeredBy = userProfie.id;
          this.totalRecords = 0;
          this.showQuestions();
        }
      );
    }
  }

  changePage(page: number) {
    this.searchParams.p = page;
    if(this.showPagination){
      this.router.navigate(['/ask-question'], { queryParams: { page: this.searchParams.p, searchTxt: this.searchParams.searchTxt, show: "expques"} });
    }
    else{
        this.showQuestions();
    }
  }
  showQuestions(){
    this.isLoading = true;
    this.askQuesService.questions(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.questions = [];
      if(data.content){
        this.questions = data.content;
        this.totalRecords = data.total;
        this.isLoading = false;
      }
    });
  }
  
  onTabChange(value) {
    this.searchParams.askCategory = value;
    if(this.showPagination){
      this.router.navigate(['/ask-question'], { queryParams: { searchTxt: this.searchParams.searchTxt, show:"experts" } });
    }
    else{
        //this.showExperts(); need to fix this
    }
  }
}