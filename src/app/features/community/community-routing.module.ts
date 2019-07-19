import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from 'src/app/ui';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { EventsListPageComponent } from './components/events-list/events-list-page.component';
import { EventDetailPageComponent } from './components/event-detail/event-detail-page.component';

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
        path: 'eventslist',
        component: EventsListPageComponent
      },
      {
        path: 'eventdetail',
        component: EventDetailPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule {}
