import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';
import { ProductDetailPageComponent } from './components/product-detail/product-detail-page.component';
import { ProductCreatePageComponent } from './components/product-create/product-create-page.component';
import { TimeAgoPipe } from '../../shared/timeago.pipe';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductNoRecordComponent } from './components/product-no-record/product-no-record.component'
@NgModule({
  declarations: [ ProductsPageComponent,
          AllProductsComponent,
          PopularSearchComponent,
          ProductDetailPageComponent,
          ProductCreatePageComponent,
          TimeAgoPipe,
          ProductNoRecordComponent ],
  imports: [
    CoreModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgbCarouselModule
  ]
})
export class ProductsModule { }
