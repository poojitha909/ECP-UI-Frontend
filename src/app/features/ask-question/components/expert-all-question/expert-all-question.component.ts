import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AskQuestionService} from '../../services/ask-question.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { UserService } from '../../../../features/user/services/user.service';
declare var UIkit;

@Component({
  selector: 'expert-all-question',
  templateUrl: './expert-all-question.component.html',
  styleUrls: ['./expert-all-question.component.scss']
})
export class ExpertAllQuestionComponent implements OnInit, OnDestroy {

  showReset: boolean;
  questions: any[];
  viewby: string;
  user: any;
  searchParams: {
    p: number,
    s: number,
    askCategory: string,
    askedBy: string,
    answeredBy: string
  };
  paramsSubs: any;
  totalRecords: number;
  constructor(private route:ActivatedRoute, 
    private router: Router,
    private store: StorageHelperService,
    private askQuesService: AskQuestionService,
    private userService: UserService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 10,
      askCategory: "",
      askedBy: "",
      answeredBy: ""
    }
  
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
    this.searchParams = {
      p: 0,
      s: 10000,
      askCategory: "",
      askedBy: "",
      answeredBy: ""
    }

    if(this.user){
      this.user = JSON.parse(this.user);
      this.userService.getUserProfile().subscribe(
        userProfie => {
          this.searchParams.answeredBy = userProfie.id;
          
          this.totalRecords = 0;
          if(this.route.snapshot.queryParams['category'] !== undefined){
            this.searchParams.askCategory = this.route.snapshot.queryParams['category'];
          }
          this.onSearch();
        }
      );
    }
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }


  showQuestions(){
    this.askQuesService.questions(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.questions = [];
      if(data.content){
        this.questions = data.content;
        this.totalRecords = data.total;
      }
    });
  }
  
  onSearch() {
    this.showQuestions();
  }
}