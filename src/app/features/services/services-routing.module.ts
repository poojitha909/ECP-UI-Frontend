import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/ui';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { AllServicesComponent } from './components/all-services/all-services.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { DetailResolverService } from './components/service-detail/resolver/detail-resolver.service';
import { ErrorComponent } from 'src/app/shared';
import { CategoryResolverService } from './category-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: AllServicesComponent,
    
  }, {
    path: 'all',
    component: AllServicesComponent,
    resolve: { categories: CategoryResolverService }
  },
  {
    path: ':name/:docId/:dbservice',
    component: ServiceDetailComponent,
    resolve: { detail: DetailResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
