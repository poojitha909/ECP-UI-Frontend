import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/ui';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { AllServicesComponent } from './components/all-services/all-services.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ServicesPageComponent
      }, {
        path: 'all',
        component: AllServicesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
