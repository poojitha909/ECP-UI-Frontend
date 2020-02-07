import { Component, OnInit } from '@angular/core';
import { AskQuestionService } from 'src/app/features/ask-question/services/ask-question.service';
import { StorageHelperService } from "../../core/services/storage-helper.service";

@Component({
  selector: 'app-featured-my-questions',
  templateUrl: './featured-my-questions.component.html',
  styleUrls: ['./featured-my-questions.component.scss']
})
export class FeaturedMyQuestionsComponent implements OnInit {

 // catsList: any[];
  questions: any[] =[];
  user: any;
  searchParamsQues: {
    p: number,
    s: number,
    searchTxt: string,
    askCategory: string,
    askedBy: string,
    answeredBy: string
  };

  constructor(private askQuesService:AskQuestionService,
    private store: StorageHelperService) { }

  ngOnInit() {
    this.initiate();
  }

  initiate(){
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
      this.searchParamsQues = {
        p: 0,
        s: 6,
        searchTxt: "",
        askCategory: "",
        askedBy: this.user.id,
        answeredBy: ""
      };
      this.askQuesService.questions(this.searchParamsQues).subscribe((response: any) => {
        const data = response.data;
        this.questions = [];
        if (data.content) {
          this.questions = data.content;
        }
      });
    }    
  }
}
