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

    window.open(`${environment.facebook.auth_uri}?client_id=${environment.facebook.clientId}&response_type=token,code&redirect_uri=${environment.facebook.redirectUrl}${this.router.url}?state=${environment.facebook.urlState}&scope=email&state={${environment.facebook.urlState}}`, '_self');
  }


  signinWithGoogle() {
    console.log("submit login to google",encodeURIComponent(environment.google.redirectUrl));
    window.open(`${environment.google.auth_uri}?scope=profile email&include_granted_scopes=true&state=${environment.google.urlState}&redirect_uri=${encodeURIComponent(environment.google.redirectUrl)}${encodeURIComponent(this.router.url)}&response_type=token&client_id=${environment.google.client_id}`, '_self');
  }

}
