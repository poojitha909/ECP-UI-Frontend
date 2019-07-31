import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin-types-view',
  templateUrl: './signin-types-view.component.html',
  styleUrls: ['./signin-types-view.component.scss']
})
export class SigninTypesViewComponent implements OnInit {

  verifyPhoneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.verifyPhoneForm = this.fb.group({
      phoneNumber: [""],
      otp: [""]
    })
  }

  ngOnInit() {

    console.log(this.router.url);
  }

  //Signin with facebook
  signinWithFacebook() {
    console.log("submit login to facebook");

    window.open(`https://www.facebook.com/v3.3/dialog/oauth?client_id=${environment.facebook.clientId}&response_type=token,code&redirect_uri=${environment.facebook.redirectUrl}${this.router.url}?state=${environment.facebook.urlState}&scope=email&state={${environment.facebook.urlState}}`, '_self');
  }


}
