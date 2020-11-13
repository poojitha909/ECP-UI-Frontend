import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent, AboutUsComponent } from './shared';
import { LayoutComponent } from './ui';
import { UserTermsComponent } from './shared/user-terms/user-terms.component';
import { UserPolicyComponent } from './shared/user-policy/user-policy.component';
import { EventsRegisterFormComponent} from './shared/events-register-form/events-register-form.component'
import { JobsForYouComponent } from './features/jobs-for-you/jobs-for-you.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/features/home/home.module').then((mod) => mod.HomeModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('src/app/features/articles/articles.module').then((mod) => mod.ArticlesModule)
      },
      {
        path: 'community',
        loadChildren: () => import('src/app/features/community/community.module').then((mod) => mod.CommunityModule)
      },
      {
        path: 'ask-question',
        loadChildren: () => import('src/app/features/ask-question/ask-question.module').then((mod) => mod.AskQuestionModule)
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
        path: 'about',
        component: AboutUsComponent
      },
      {
        path: 'user-terms',
        component: UserTermsComponent
      },
      {
        path: 'user-policy',
        component: UserPolicyComponent
      },
      {
        path: 'user',
        loadChildren: () => import('src/app/features/user/user.module').then((mod) => mod.UserModule)
      },
      {
        path:'events-register',
        component: EventsRegisterFormComponent
      },
      {
        path:'jobs-for-you',
        component:JobsForYouComponent
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
