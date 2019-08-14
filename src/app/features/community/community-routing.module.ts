import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from 'src/app/ui';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { EventsListPageComponent } from './components/events-list/events-list-page.component';
import { EventDetailPageComponent } from './components/event-detail/event-detail-page.component';
import {DiscussionsListPageComponent} from './components/discussions-list/discussions-list-page.component'
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CommunityPageComponent
      },
      {
        path: 'events',
        component: EventsListPageComponent
      },
      {
        path: 'event/:id',
        component: EventDetailPageComponent
      },
      {
        path: 'discussions',
        component: DiscussionsListPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule {}
