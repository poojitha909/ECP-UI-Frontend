import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { EventsListPageComponent } from './components/events-list/events-list-page.component';
import { DiscussionsListPageComponent } from './components/discussions-list/discussions-list-page.component';
import { DiscussionCreatePageComponent } from './components/discussion-create/discussion-create-page.component';
import { DiscussionSummaryComponent } from './components/discussion-summary/discussion-summary.component';
import { EventDetailPageComponent } from './components/event-detail/event-detail-page.component';
import { EventCreatePageComponent } from './components/event-create/event-create-page.component';
import { DiscussionDetailPageComponent } from './components/discussion-detail/discussion-detail-page.component';
import { DiscussionNoRecordComponent } from './components/discussion-no-record/discussion-no-record.component';
import { EventNoRecordComponent } from './components/event-no-record/event-no-record.component';
import { SharedModule } from '../../shared';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommunitySearchResultComponent } from './components/community-search-result/community-search-result.component';
import { DiscussionSearchListPageComponent } from './components/discussion-search-list-page/discussion-search-list-page.component';
import { EventSearchListPageComponent } from './components/event-search-list-page/event-search-list-page.component';

@NgModule({
  declarations: [
    CommunityPageComponent,
    DiscussionNoRecordComponent,
    EventsListPageComponent,
    EventCreatePageComponent,
    DiscussionDetailPageComponent,
    DiscussionCreatePageComponent,
    DiscussionSummaryComponent,
    EventNoRecordComponent,
    EventDetailPageComponent,
    DiscussionsListPageComponent,
    CommunitySearchResultComponent,
    DiscussionSearchListPageComponent,
    EventSearchListPageComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CoreModule,
    SharedModule,
    EditorModule
  ]
})
export class CommunityModule { }
