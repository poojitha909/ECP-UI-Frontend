import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskQuestionPageComponent } from './components/ask-question-page/ask-question-page.component';
import { AskQuestionRoutingModule } from './ask-question-routing.module';

@NgModule({
  declarations: [AskQuestionPageComponent],
  imports: [
    CommonModule,
    AskQuestionRoutingModule
  ]
})
export class AskQuestionModule { }
