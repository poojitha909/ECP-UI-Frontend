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
import { EventCreatePageComponent } from './components/event-create/event-create-page.component';
import { DiscussionDetailPageComponent } from './components/discussion-detail/discussion-detail-page.component';
import { DiscussionNoRecordComponent } from './components/discussion-no-record/discussion-no-record.component';
import { EventNoRecordComponent } from './components/event-no-record/event-no-record.component';
import { EllipsisPipe } from '../../shared/ellipsis.pipe';
import { TimeAgoPipe } from '../../shared/timeago.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
        EllipsisPipe,
        TimeAgoPipe,
        CommunityPageComponent,
        DiscussionNoRecordComponent,
        EventsListPageComponent,
        EventCreatePageComponent,
        DiscussionDetailPageComponent,
        DiscussionCreatePageComponent,
        DiscussionSummaryComponent,
        DiscussionSummaryCatComponent,
        EventNoRecordComponent,
        EventSummaryComponent,
        EventDetailPageComponent,
        DiscussionsListPageComponent
    ],
  imports: [
        CommonModule,
        CommunityRoutingModule,
        CoreModule,
        NgxPaginationModule
    ]
})
export class CommunityModule { }
