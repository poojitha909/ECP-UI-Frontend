import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from 'src/app/ui';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { EventsListPageComponent } from './components/events-list/events-list-page.component';
import { EventDetailPageComponent } from './components/event-detail/event-detail-page.component';
import { DiscussionDetailPageComponent } from './components/discussion-detail/discussion-detail-page.component';
import {DiscussionsListPageComponent} from './components/discussions-list/discussions-list-page.component'
import {DiscussionCreatePageComponent} from './components/discussion-create/discussion-create-page.component'
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
      {
        path: 'discussions/:category',
        component: DiscussionsListPageComponent
      },
      {
        path: 'discussion/add',
        component: DiscussionCreatePageComponent
      },
      {
        path: 'discussion/edit/:id',
        component: DiscussionCreatePageComponent
      },
      {
        path: 'discussion/:id',
        component: DiscussionDetailPageComponent
      },
      {
        path: 'discussion/:id/:category',
        component: DiscussionDetailPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule {}
