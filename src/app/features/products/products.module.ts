import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';
import { ProductDetailPageComponent } from './components/product-detail/product-detail-page.component';
import { ProductCreatePageComponent } from './components/product-create/product-create-page.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule,NotifierOptions} from "angular-notifier";

const customNotifierOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "left",
          distance: 524
      },
      vertical: {
          position: "top",
          distance: 330,
          gap: 10
      }
  },
  theme: "material",
  behaviour: {
      autoHide: 2000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          preset: "slide",
          speed: 300,
          easing: "ease"
      },
      hide: {
          preset: "fade",
          speed: 300,
          easing: "ease",
          offset: 50
      },
      shift: {
          speed: 300,
          easing: "ease"
      },
      overlap: 150
  }
};
@NgModule({
  declarations: [ 
          AllProductsComponent,
          PopularSearchComponent,
          ProductDetailPageComponent,
          ProductCreatePageComponent],
  imports: [
    CoreModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgbCarouselModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class ProductsModule { }
