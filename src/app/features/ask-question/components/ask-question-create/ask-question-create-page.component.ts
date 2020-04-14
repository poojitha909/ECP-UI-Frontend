import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-ask-question-create',
  templateUrl: './ask-question-create-page.component.html',
  styleUrls: ['./ask-question-create-page.component.scss']
})
export class AskQuestionCreatePageComponent implements OnInit {

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
  category: string;
  answeredBy: string;
  user: any;
  paramsSubs: any;
  expert: any;
  quesForm: FormGroup;
  searchParams: {
    p: number,
    s: number,
    askedBy: string,
    answeredBy: string
  };
  questions: any[];
  totalRecords: number;
  rUrl: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private askQuesService: AskQuestionService, private store: StorageHelperService,
    private authService: AuthService, private fb: FormBuilder, private seoService: SeoService) { }

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
    document.getElementById("askExpertHeading").focus();
  }
  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 10,
      askedBy: "",
      answeredBy: ""
    }
    this.breadcrumbLinks[1].queryParams = this.route.snapshot.queryParams;
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
      this.searchParams.askedBy = this.user.id;
    }
    this.rUrl="?";
    if (this.route.snapshot.queryParams['expertCategory']) {
      this.category = this.route.snapshot.queryParams['expertCategory'];
      this.rUrl= this.rUrl + "category=" + this.category + "&";
    }
    if (this.route.snapshot.queryParams['answeredBy']) {
      this.answeredBy = this.route.snapshot.queryParams['answeredBy'];
      this.searchParams.answeredBy = this.route.snapshot.queryParams['answeredBy'];
      this.rUrl= this.rUrl + "answeredBy=" + this.answeredBy + "&";
    }
    if (this.searchParams.askedBy && this.searchParams.answeredBy) {
      this.showQuestions();
    }

    let question = this.store.retrieve("new-question");
    if (question) {
      question = JSON.parse(question);
      this.store.clear("new-question");
    }

    this.quesForm = this.fb.group({
      question: [question ? question.question : "", Validators.required],
      description: [question ? question.description : "", Validators.required],
    });

    this.askQuesService.getUserProfile(this.answeredBy).subscribe((response: any) => {
      if (response.data.id != "") {
        this.expert = response.data;
        this.setSeoTags(this.expert);
        if(!this.category && this.expert.experties[0]){
          this.category = this.expert.experties[0].id;
        }
      }
      else {
        alert("Oops! something wrong happen, please try again.");
      }
    });

  }

  showQuestions() {
    this.askQuesService.questions(this.searchParams).subscribe((response: any) => {
      this.totalRecords = 0;
      const data = response.data;
      this.questions = [];
      if (data.content) {
        this.questions = data.content;
        this.totalRecords = data.total;
      }
    });
  }

  redirectToQuestions(){
    this.router.navigate(['/ask-question/'],{ queryParams: { 
    show: "ques"}});
  }

  setSeoTags(expert: any) {
    let experties = '';
    if (expert.experties && expert.experties.length > 0) {
      expert.experties.forEach(val => {
        experties = experties + val.name + ',';
      });
      experties = experties.substring(0, experties.lastIndexOf(","));
    }
    const config: SEO = {
      title: `Ask our expert - ${expert.basicProfileInfo.firstName}`,
      keywords: 'products,services,events,dscussions',
      description: `Experties in ${experties}`,
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${expert.profileImage ? expert.thumbnailImage : window.location.origin + '/assets/imgaes/landing-img/Ask-320.png'}`,
    }

    this.seoService.generateTags(config);
  }

  get formControl() {
    return this.quesForm.controls;
  }

  onReset() {
    this.quesForm.reset();
    this.router.navigate(['/ask-question']);
  }

  onSubmit() {
    this.store.store("new-question", JSON.stringify(this.quesForm.value));
    if (!this.user) {
      this.authService.redirectUrl = "/ask-question/add"+this.rUrl;
      this.router.navigate(['/user/signin']);
      return;
    }

    Object.keys(this.quesForm.controls).forEach(field => {
      const control = this.quesForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!this.quesForm.valid) {
      return;
    }

    let que = { ...this.quesForm.value };
    que.askCategory = { id: this.category };
    que.answeredBy = { id: this.answeredBy };
    que.askedBy = { id: this.user.id };
    que.answered = false;

    this.store.store("new-question-preview", JSON.stringify(que));
    this.router.navigate(['/ask-question/detail/preview']);
  }
}