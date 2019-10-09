import { NgModule } from '@angular/core';

import { ArticlesPageComponent } from './components/articles-page/articles-page.component';
import { LayoutComponent } from 'src/app/ui';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArticlesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
