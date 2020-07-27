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
import { SharedModule } from '../../shared';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NotifierModule,NotifierOptions} from "angular-notifier";
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { QuillModule } from 'ngx-quill';
import { ApiConstants } from 'src/app/api.constants';

const customNotifierOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "left",
          distance: 524
      },
      vertical: {
          position: "top",
          distance: 330,
          gap: 10
      }
  },
  theme: "material",
  behaviour: {
      autoHide: 2000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          preset: "slide",
          speed: 300,
          easing: "ease"
      },
      hide: {
          preset: "fade",
          speed: 300,
          easing: "ease",
          offset: 50
      },
      shift: {
          speed: 300,
          easing: "ease"
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
    EventDetailPageComponent,
    DiscussionsListPageComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CoreModule,
    SharedModule,
    EditorModule,
    NotifierModule.withConfig(customNotifierOptions),
    QuillModule.forRoot({
      modules: {
        imageResize: true,
        imageUpload: {
          upload: file => {
            return new Promise((resolve, reject) => {
              const formData = new FormData()
              formData.append('images', file);
              formData.append("name", "discussion_image");
              formData.append("description", "discussion_image_description");
              fetch(ApiConstants.IMAGE_UPLOAD + "?typ=discussion_image", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json' 
                },
                body: formData
              })
              .then(response => response.json())
              .then(data => {
                resolve(data[0])
              })
              .catch(error => {
                console.error(error)
              })
            });
          }
        },
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    })
  ]
})
export class CommunityModule { }
