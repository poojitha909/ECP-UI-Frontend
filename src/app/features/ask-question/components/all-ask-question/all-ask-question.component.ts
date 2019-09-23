import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AskQuestionService} from '../../services/ask-question.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-ask-question.component.html',
  styleUrls: ['./all-ask-question.component.scss']
})
export class AllAskQuestionComponent implements OnInit, OnDestroy {

  showReset: boolean;
  experts: any[];
  catsList: any[];
  searchParams: {
    p: number,
    s: number,
    experties: string
  };
  
  paramsSubs: any;
  totalRecords: number;
  constructor(private route:ActivatedRoute, private router: Router, private askQuesService: AskQuestionService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 2,
      experties: ""
    }
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    }); 
  }

  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }
  
  initiate(){
    this.searchParams = {
      p: 0,
      s: 10000,
      experties: ""
    }
    
    this.totalRecords = 0;
    console.log(this.route.snapshot.params);
    if(this.route.snapshot.params['category'] !== undefined){
      this.searchParams.experties = this.route.snapshot.params['category'];
    }
    
    this.onSearch();
    this.askQuesService.getCategoryList().subscribe( (response:any) =>{
      const data = response.data;
      this.catsList = [];
      if(data.content){
        this.catsList = data.content;
      }
    });
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
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

  onTabChange(value) {
    this.router.navigate(['/ask-question/all', {category: value}]);
  }
  
  onSearch() {
    this.showExperts();
  }

}
