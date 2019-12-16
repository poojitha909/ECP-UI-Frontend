import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskQuestionPageComponent } from './components/ask-question-page/ask-question-page.component';
import { AllAskQuestionComponent } from './components/all-ask-question/all-ask-question.component';
import { AskQuestionCreatePageComponent } from './components/ask-question-create/ask-question-create-page.component';
import { AskQuestionDetailPageComponent } from './components/ask-question-detail/ask-question-detail-page.component';
import { LayoutComponent } from 'src/app/ui';
import { ExpertAllQuestionComponent } from './components/expert-all-question/expert-all-question.component';

const routes: Routes = [

  {
    path: '',
    component: AskQuestionPageComponent
  },
  {
    path: 'all',
    component: AllAskQuestionComponent
  },
  {
    path: 'add',
    component: AskQuestionCreatePageComponent
  },
  {
    path: 'expert',
    component: ExpertAllQuestionComponent
  },
  {
    path: 'detail/:id',
    component: AskQuestionDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskQuestionRoutingModule { }
