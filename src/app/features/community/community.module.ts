import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { EventsListPageComponent } from './components/events-list/events-list-page.component';
import { EventSummaryComponent } from './components/event-summary/event-summary.component';

@NgModule({
  declarations: [CommunityPageComponent,EventsListPageComponent,EventSummaryComponent],
  imports: [CommonModule, CommunityRoutingModule,CoreModule]
})
export class CommunityModule {}
