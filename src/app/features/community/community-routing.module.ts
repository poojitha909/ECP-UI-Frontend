import { NgModule } from '@angular/core';
import { LayoutComponent } from 'src/app/ui';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPageComponent } from './components/community-page/community-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CommunityPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
