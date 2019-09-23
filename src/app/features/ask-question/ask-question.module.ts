import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { AskQuestionPageComponent } from './components/ask-question-page/ask-question-page.component';
import { AskQuestionRoutingModule } from './ask-question-routing.module';
import { AllAskQuestionComponent } from './components/all-ask-question/all-ask-question.component';
import { ExpertDetailCardComponent } from './components/expert-detail-card/expert-detail-card.component';
@NgModule({
  declarations: [AskQuestionPageComponent, AllAskQuestionComponent, ExpertDetailCardComponent],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    AskQuestionRoutingModule
  ]
})
export class AskQuestionModule { }
