import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';
import { CoreModule } from 'src/app/core';

@NgModule({
  declarations: [ProductsPageComponent, AllProductsComponent, SearchContainerComponent, PopularSearchComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CoreModule,
    SharedModule,

  ]
})
export class ProductsModule { }
