import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailCardComponent } from './product-detail-card/product-detail-card.component';
import { ServiceDetailCardComponent } from './service-detail-card/service-detail-card.component';
import { CoreModule } from '../core';
import { ServicesListComponent } from './services-list/services-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ErrorComponent } from './error/error.component';
import { FrontendPaginationComponent } from './frontend-pagination/frontend-pagination.component';
import { KeyHandlerDirective } from './directives/key-handler.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { DefaultImageDirective } from './directives/default-image.directive';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent, ServicesListComponent, PaginationComponent, ErrorComponent, FrontendPaginationComponent, KeyHandlerDirective, AboutUsComponent, DefaultImageDirective],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CoreModule,
    // NgxPaginationModule
  ],
  exports: [
    ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent, PaginationComponent, ServicesListComponent, FrontendPaginationComponent, KeyHandlerDirective, DefaultImageDirective
  ]
})
export class SharedModule { }
