import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { CoreModule } from 'src/app/core';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [ServicesPageComponent],
  imports: [CommonModule, ServicesRoutingModule, SharedModule, CoreModule]
})
export class ServicesModule { }
