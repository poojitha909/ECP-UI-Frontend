import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { AskQuestionPageComponent } from './components/ask-question-page/ask-question-page.component';
import { AskQuestionRoutingModule } from './ask-question-routing.module';
import { AskQuestionCreatePageComponent }  from './components/ask-question-create/ask-question-create-page.component';
import { NoExpertReplyComponent } from './components/no-expert-reply/no-expert-reply.component';
import { AskQuestionDetailPageComponent } from './components/ask-question-detail/ask-question-detail-page.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NotifierModule,NotifierOptions} from "angular-notifier";

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
      autoHide: 3000,
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
  declarations: [AskQuestionPageComponent,
    AskQuestionCreatePageComponent,
    NoExpertReplyComponent,
    AskQuestionDetailPageComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    AskQuestionRoutingModule,
    EditorModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class AskQuestionModule { }
