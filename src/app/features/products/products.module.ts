import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';
import { ProductDetailPageComponent } from './components/product-detail/product-detail-page.component';
import { TimeAgoPipe } from '../../shared/timeago.pipe';

@NgModule({
  declarations: [ProductsPageComponent, AllProductsComponent,  PopularSearchComponent, ProductDetailPageComponent, TimeAgoPipe],
  imports: [
    CoreModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
