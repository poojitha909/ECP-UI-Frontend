import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin-types-view',
  templateUrl: './signin-types-view.component.html',
  styleUrls: ['./signin-types-view.component.scss']
})
export class SigninTypesViewComponent implements OnInit {
  @Input() otpGenerated: boolean;
  @Output() requestForOtp = new EventEmitter();
  @Output() verfiyOtp = new EventEmitter();
  @Output() resendOtp = new EventEmitter();

  otpResend: boolean;
  mobileNumber: string;
  numberError: string;
  OtpCode: string;
  constructor(
    private router: Router
  ) {

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
    console.log("submit login to google", encodeURIComponent(environment.google.redirectUrl));
    window.open(`${environment.google.auth_uri}?scope=profile email&include_granted_scopes=true&state=${environment.google.urlState}&redirect_uri=${encodeURIComponent(environment.google.redirectUrl)}${encodeURIComponent(this.router.url)}&response_type=token&client_id=${environment.google.client_id}`, '_self');
  }

  requestOtp() {
    this.numberError = null;
    if (this.mobileNumber && this.mobileValidation()) {
      if (!this.otpGenerated) {
        this.requestForOtp.emit(this.mobileNumber);
      }

      if (this.otpGenerated && this.OtpCode) {
        const verfication = {
          number: this.mobileNumber,
          code: this.OtpCode
        };
        this.verfiyOtp.emit(verfication);
      }
    } else {
      this.numberError = "Please enter a valid mobile number";
    }
  }

  changeNumber() {
    this.mobileNumber = null;
    this.otpResend = false;
    this.requestForOtp.emit(this.mobileNumber);
  }

  requestResendOtp() {
    this.numberError = null;
    if (this.mobileNumber && this.mobileValidation()) {
      this.otpResend = true;
      this.resendOtp.emit(this.mobileNumber);
    } else {
      this.numberError = "Please enter a valid mobile number";
    }
  }

  mobileValidation(): boolean {
    console.log(this.mobileNumber.toString().length);
    if (this.mobileNumber.toString().length > 10) {
      return false
    }
    return true;
  }

}
