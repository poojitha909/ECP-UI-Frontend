import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared';
import { AllProductsComponent } from './components/all-products/all-products.component';

@NgModule({
  declarations: [ProductsPageComponent, AllProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
