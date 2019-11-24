import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    },
    {
      text: 'All Experts',
      link: '/ask-question/all'
    }
  ];
  category: string;
  answeredBy: string;
  user: any;
  paramsSubs: any;
  expert: any;
  quesForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, 
    private askQuesService: AskQuestionService, private store: StorageHelperService, 
    private authService: AuthService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }
  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    if(this.route.snapshot.queryParams['category']){
      this.category = this.route.snapshot.queryParams['category'];
    }
    if(this.route.snapshot.queryParams['answeredBy']){
      this.answeredBy = this.route.snapshot.queryParams['answeredBy'];
    }

    let question = this.store.retrieve("new-question");
    if (question) {
      question = JSON.parse(question);
      this.store.clear("new-question");
    }

    this.quesForm = this.fb.group({
      question:  [question ? question.question : "", Validators.required],
      description:  [question ? question.description : "", Validators.required],
    });

    this.askQuesService.getUserProfile(this.answeredBy).subscribe((response: any) => {
      console.log(response);
      if (response.data.id != "") {
        this.expert = response.data
      }
      else {
        alert("Oops! something wrong happen, please try again.");
      }
    });
  }

  get formControl() {
    return this.quesForm.controls;
  }

  onReset() {
    this.quesForm.reset();
    this.router.navigate(['/ask-question']);
  }

  onSubmit() {
    Object.keys(this.quesForm.controls).forEach(field => {
      const control = this.quesForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!this.quesForm.valid) {
      return;
    }
    this.store.store("new-question", JSON.stringify(this.quesForm.value));

    if (!this.user) {
      this.authService.redirectUrl = "/ask-question/add";
      this.router.navigate(['/user/signin']);
      return;
    }

    let que = { ...this.quesForm.value };
    que.askCategory = { id: this.category };
    que.answeredBy = { id: this.answeredBy };
    que.askedBy = { id: this.user.id };
    
    this.store.store("new-question-preview", JSON.stringify( que ));
    this.router.navigate(['/ask-question/detail/preview']);
    // if (que.category != "" && que.question != "" && que.description != "") {
      // this.askQuesService.addQuestion({
      //   question: this.question,
      //   description: this.description,
      //   askCategory: { id: this.category },
      //   answeredBy: { id: this.answeredBy },
      //   askedBy: { id: this.askedBy }
      // }).subscribe((response: any) => {
      //   if (response.data.id != "") {
      //     this.router.navigate(['/ask-question']);
      //   }
      //   else {
      //     alert("Oops! something wrong happen, please try again.");
      //   }
      // });
    // }
    // else {
    //   alert("All fields are required, please fill all fields.");
    // }
    // return;
  }
}