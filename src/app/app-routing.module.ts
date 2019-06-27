import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/features/home/home.module').then((mod) => mod.HomeModule)
  },
  {
    path: 'services',
    loadChildren: () => import('src/app/features/services/services.module').then((mod) => mod.ServicesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
