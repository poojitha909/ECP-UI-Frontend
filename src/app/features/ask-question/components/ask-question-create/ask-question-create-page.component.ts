import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from '../../services/ask-question.service';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";


@Component({
  selector: 'app-ask-question-create',
  templateUrl: './ask-question-create-page.component.html',
  styleUrls: ['./ask-question-create-page.component.scss']
})
export class AskQuestionCreatePageComponent implements OnInit {

  category: string;
  askedBy: string;
  answeredBy: string
  question: string;
  description: string;
  user: any;
  paramsSubs: any;
  expert: any;

  constructor(private route:ActivatedRoute, private router: Router, private askQuesService: AskQuestionService, private store: StorageHelperService, private authService: AuthService) { }

  ngOnInit() {
    this.askedBy = "";
    this.answeredBy = "";
    this.category = "";
    this.question =  "";
    this.description =  "";
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
      this.askedBy = this.user.id;
    }
    if(this.route.snapshot.params['category']){
      this.category = this.route.snapshot.params['category'];
    }
    if(this.route.snapshot.params['answeredBy']){
      this.answeredBy = this.route.snapshot.params['answeredBy'];
    }
    
    let question = this.store.retrieve("new-question");
    if(question){
      this.question =  question.question;
      this.description =  question.description;
      this.category = question.category;
      this.answeredBy = question.answeredBy;
      this.store.clear("new-question");
    }

    this.askQuesService.getUserProfile(this.answeredBy).subscribe( (response:any) => {
      console.log(response);
      if(response.data.id != ""){
        this.expert = response.data
      }
      else{
        alert("Oops! something wrong happen, please try again.");            
      }
    });
  }

  changeDescription(value){
    this.description = value;
  }

  onReset(){
    this.question =  "";
    this.description =  "";
    this.router.navigate(['/ask-question']);
  }
  
  onSubmit(){
    if(!this.user){
      this.store.store("new-question", JSON.stringify(
        { 
          question: this.question,
          description: this.description,
          category: this.category,
          answeredBy: this.answeredBy
        }
      ));
      this.authService.redirectUrl = "/ask-question/add";
      this.router.navigate(['/user/signin']);
      return;
    }
    
    if(this.category!="" && this.question!= "" && this.description != ""){
      this.askQuesService.addQuestion({
          question: this.question,
          description: this.description,
          askCategory: {id: this.category},
          answeredBy: {id: this.answeredBy},
          askedBy: {id: this.askedBy}
        }).subscribe( (response:any) => {
        if(response.data.id != ""){
          this.router.navigate(['/ask-question']);
        }
        else{
          alert("Oops! something wrong happen, please try again.");            
        }
      });
    }
    else{
      alert("All fields are required, please fill all fields.");
    }
    return;
  }
}