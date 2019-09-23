import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from 'src/app/ui';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductDetailPageComponent } from './components/product-detail/product-detail-page.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductCreatePageComponent } from './components/product-create/product-create-page.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductsPageComponent
      },
      {
        path: 'all',
        component: AllProductsComponent
      },
      {
        path: 'add',
        component: ProductCreatePageComponent
      },
      {
        path: ':id',
        component: ProductDetailPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
