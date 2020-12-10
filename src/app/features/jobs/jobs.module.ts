import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { CoreModule } from 'src/app/core';
import { JobsRoutingModule } from './jobs-routing.module';
import { SharedModule } from 'src/app/shared';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

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
  declarations: [JobListComponent, JobDetailsComponent, JobSearchComponent],
  imports: [
    CoreModule,
    CommonModule,
    JobsRoutingModule,
    SharedModule,
    NgbCarouselModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgSelectModule
  ]
})
export class JobsModule { }
