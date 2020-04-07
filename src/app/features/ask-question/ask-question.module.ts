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
    EditorModule
  ]
})
export class AskQuestionModule { }
