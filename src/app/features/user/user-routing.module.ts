import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LayoutComponent } from 'src/app/ui';
import { SigninComponent } from './components/signin/signin.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserResolverService } from './services/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    resolve: { userData: UserResolverService }
  },
  {
    path: 'signin',
    component: SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
