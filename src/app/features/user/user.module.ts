import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { CoreModule } from 'src/app/core';
import { UserRoutingModule } from './user-routing.module';
import { UiModule } from 'src/app/ui';
import { SigninComponent } from './components/signin/signin.component';
import { SigninTypesViewComponent } from './components/signin-types-view/signin-types-view.component';
import { AdditionalInfoFormComponent } from './components/additional-info-form/additional-info-form.component';
import { UserPageComponent } from './components/user-page/user-page.component';



@NgModule({
  declarations: [SignupComponent, SigninComponent, SigninTypesViewComponent, AdditionalInfoFormComponent, UserPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    UiModule,
    UserRoutingModule
  ]
})
export class UserModule { }
