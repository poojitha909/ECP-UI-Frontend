import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { CoreModule } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { AllServicesComponent } from './components/all-services/all-services.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { TimeAgoPipe } from 'src/app/shared/timeago.pipe';


@NgModule({
  declarations: [ServicesPageComponent, AllServicesComponent, SearchContainerComponent, PopularSearchComponent, ServiceDetailComponent,TimeAgoPipe],
  imports: [CommonModule, ServicesRoutingModule, SharedModule, CoreModule]
})
export class ServicesModule { }
