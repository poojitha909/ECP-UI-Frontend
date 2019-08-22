import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { EventsListPageComponent } from './components/events-list/events-list-page.component';
import { DiscussionsListPageComponent } from './components/discussions-list/discussions-list-page.component';
import { DiscussionCreatePageComponent } from './components/discussion-create/discussion-create-page.component';
import { DiscussionSummaryComponent } from './components/discussion-summary/discussion-summary.component';
import { DiscussionSummaryCatComponent } from './components/discussion-summary-cat/discussion-summary-cat.component';
import { EventSummaryComponent } from './components/event-summary/event-summary.component';
import { EventDetailPageComponent } from './components/event-detail/event-detail-page.component';
import { DiscussionDetailPageComponent } from './components/discussion-detail/discussion-detail-page.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { DiscussionNoRecordComponent } from './components/discussion-no-record/discussion-no-record.component';
import { EllipsisPipe } from '../../shared/ellipsis.pipe';
import { TimeAgoPipe } from '../../shared/timeago.pipe';

@NgModule({
  declarations: [
        EllipsisPipe,
        TimeAgoPipe,
        CommunityPageComponent,
        DiscussionNoRecordComponent,
        EventsListPageComponent,
        DiscussionDetailPageComponent,
        DiscussionCreatePageComponent,
        DiscussionSummaryComponent,
        DiscussionSummaryCatComponent,
        EventSummaryComponent,
        EventDetailPageComponent,
        DiscussionsListPageComponent,
        PaginationComponent
    ],
  imports: [
        CommonModule,
        CommunityRoutingModule,
        CoreModule
    ]
})
export class CommunityModule { }
