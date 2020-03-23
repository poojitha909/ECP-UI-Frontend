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
import { NotifierModule,NotifierOptions} from "angular-notifier";
import { NotifierContainerComponent } from './components/notifier-container/notifier-container.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    NotifierContainerComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CoreModule,
    SharedModule,
    EditorModule,
    NotifierModule.withConfig(customNotifierOptions)
  
  ]
})
export class CommunityModule { }
