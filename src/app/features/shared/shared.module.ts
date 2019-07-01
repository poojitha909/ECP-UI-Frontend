import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailCardComponent } from './product-detail-card/product-detail-card.component';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailCardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
