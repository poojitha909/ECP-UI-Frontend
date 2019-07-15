import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { CoreModule } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { AllServicesComponent } from './components/all-services/all-services.component';


@NgModule({
  declarations: [ServicesPageComponent, AllServicesComponent],
  imports: [CommonModule, ServicesRoutingModule, SharedModule, CoreModule]
})
export class ServicesModule { }
