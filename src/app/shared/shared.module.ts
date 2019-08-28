import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailCardComponent } from './product-detail-card/product-detail-card.component';
import { ServiceDetailCardComponent } from './service-detail-card/service-detail-card.component';
import { CoreModule } from '../core';
import { ServicesListComponent } from './services-list/services-list.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent, ServicesListComponent, PaginationComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CoreModule
  ],
  exports: [
    ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent, PaginationComponent, ServicesListComponent
  ]
})
export class SharedModule { }
