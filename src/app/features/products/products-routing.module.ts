import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailPageComponent } from './components/product-detail/product-detail-page.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductCreatePageComponent } from './components/product-create/product-create-page.component';
const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
