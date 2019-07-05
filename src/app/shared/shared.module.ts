import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailCardComponent } from './product-detail-card/product-detail-card.component';
import { ServiceDetailCardComponent } from './service-detail-card/service-detail-card.component';
import { CoreModule } from '../core';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CoreModule
  ],
  exports: [
    ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent
  ]
})
export class SharedModule { }
