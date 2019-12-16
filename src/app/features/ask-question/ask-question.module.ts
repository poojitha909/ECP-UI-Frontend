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
import { ExpertAllQuestionComponent } from './components/expert-all-question/expert-all-question.component';
import { QuestionExpertNoRecordComponent } from './components/question-expert-no-record/question-expert-no-record.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [AskQuestionPageComponent,
    AllAskQuestionComponent,
    ExpertDetailCardComponent,
    AskQuestionCreatePageComponent,
    ExpertNoRecordComponent,
    QuestionNoRecordComponent,
    QuestionDetailCardComponent,
    AskQuestionDetailPageComponent,
    ExpertAllQuestionComponent,
    QuestionExpertNoRecordComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    AskQuestionRoutingModule,
    EditorModule
  ]
})
export class AskQuestionModule { }
