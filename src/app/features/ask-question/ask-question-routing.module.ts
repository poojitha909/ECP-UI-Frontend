import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskQuestionPageComponent } from './components/ask-question-page/ask-question-page.component';
import { AllAskQuestionComponent } from './components/all-ask-question/all-ask-question.component';
import { LayoutComponent } from 'src/app/ui';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AskQuestionPageComponent
      },
      {
        path: 'all',
        component: AllAskQuestionComponent
      },
      // {
      //   path: 'add',
      //   component: ProductCreatePageComponent
      // },
      // {
      //   path: ':id',
      //   component: ProductDetailPageComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskQuestionRoutingModule { }
