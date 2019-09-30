import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { AskQuestionPageComponent } from './components/ask-question-page/ask-question-page.component';
import { AskQuestionRoutingModule } from './ask-question-routing.module';
import { AllAskQuestionComponent } from './components/all-ask-question/all-ask-question.component';
import { AskQuestionCreatePageComponent }  from './components/ask-question-create/ask-question-create-page.component';
import { ExpertDetailCardComponent } from './components/expert-detail-card/expert-detail-card.component';
import { ExpertNoRecordComponent } from './components/expert-no-record/expert-no-record.component';
import { QuestionNoRecordComponent } from './components/question-no-record/question-no-record.component';
import { QuestionDetailCardComponent } from './components/question-detail-card/question-detail-card.component';
import { AskQuestionDetailPageComponent } from './components/ask-question-detail/ask-question-detail-page.component';
import { TimeAgoPipe } from '../../shared/timeago.pipe';

@NgModule({
  declarations: [AskQuestionPageComponent,
    AllAskQuestionComponent,
    ExpertDetailCardComponent,
    AskQuestionCreatePageComponent,
    ExpertNoRecordComponent,
    QuestionNoRecordComponent,
    QuestionDetailCardComponent,
    AskQuestionDetailPageComponent,
    TimeAgoPipe
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    AskQuestionRoutingModule
  ]
})
export class AskQuestionModule { }
