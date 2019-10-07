import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent, AboutUsComponent } from './shared';
import { LayoutComponent } from './ui';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/features/home/home.module').then((mod) => mod.HomeModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('src/app/features/articles/articles.module').then((mod) => mod.ArticlesModule)
  },
  {
    path: 'ask-question',
    loadChildren: () => import('src/app/features/ask-question/ask-question.module').then((mod) => mod.AskQuestionModule)
  },
  {
    path: 'community',
    loadChildren: () => import('src/app/features/community/community.module').then((mod) => mod.CommunityModule)
  },
  {
    path: 'products',
    loadChildren: () => import('src/app/features/products/products.module').then((mod) => mod.ProductsModule)
  },
  {
    path: 'services',
    loadChildren: () => import('src/app/features/services/services.module').then((mod) => mod.ServicesModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/features/user/user.module').then((mod) => mod.UserModule)
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'about',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AboutUsComponent
      }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
