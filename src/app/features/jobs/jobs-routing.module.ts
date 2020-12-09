import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobSearchComponent } from './job-search/job-search.component';
const routes: Routes = [
  {
    path: '',
    component: JobSearchComponent
  },
  // {
  //   path: 'add',
  //   component: ProductCreatePageComponent
  // },
  // {
  //   path: ':id',
  //   component: ProductDetailPageComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
