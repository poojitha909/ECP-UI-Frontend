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
// import { CategoryResolverService } from './category-resolver.service';



@NgModule({
  declarations: [ServicesPageComponent, AllServicesComponent, SearchContainerComponent, PopularSearchComponent, ServiceDetailComponent],
  imports: [CommonModule, ServicesRoutingModule, SharedModule, CoreModule],
  // providers: [CategoryResolverService]
})
export class ServicesModule { }
