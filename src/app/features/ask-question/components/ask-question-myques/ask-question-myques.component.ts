import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'ask-question-myques',
  templateUrl: './ask-question-myques.component.html',
  styleUrls: ['./ask-question-myques.component.scss']
})
export class AskQuestionMyQuesComponent implements OnInit, OnDestroy {
  // breadcrumbLinks: Breadcrumb[] = [
  //   {
  //     text: 'Home',
  //     link: '/'
  //   },
  //   {
  //     text: 'Ask an Expert',
  //     link: '/ask-question'
  //   }
  // ];
  questions: any[];
  user: any;
  searchParamsQues: {
    p: number,
    s: number,
    searchTxt: string,
    askCategory: string,
    askedBy: string,
    answeredBy: string
  };
  paramsSubs: any;
  totalRecordsQues: number;
  
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
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {

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
    else{
      this.searchParamsQues.askedBy = "no_user";
    }

    this.totalRecordsQues = 0;
    // if (this.route.snapshot.queryParams['category'] !== undefined) {
    //   this.searchParamsQues.askCategory = this.route.snapshot.queryParams['category'];
    // }
    if (this.route.snapshot.queryParams['pageQ'] !== undefined) {
      this.searchParamsQues.p = this.route.snapshot.queryParams['pageQ'];
    }

    this.showQuestions();
  }

  changeQuesPage(page: number){
    this.searchParamsQues.p = page;
    this.router.navigate(['/ask-question'], { queryParams: { pageQ: this.searchParamsQues.p, show: "ques"} });
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
}