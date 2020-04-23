import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'app-signin-types-view',
  templateUrl: './signin-types-view.component.html',
  styleUrls: ['./signin-types-view.component.scss']
})
export class SigninTypesViewComponent implements OnInit, OnChanges {
  @Input() otpGenerated: boolean;
  @Input() otpFailed: string;
  @Output() requestForOtp = new EventEmitter();
  @Output() verfiyOtp = new EventEmitter();
  @Output() resendOtp = new EventEmitter();

  otpResend: boolean;
  mobileNumber: string;
  numberError: string;
  OtpCode: string;
  config: any;

  constructor(
    private router: Router,
    private configServ: ConfigurationService
  ) {
    this.configServ.loadConfigurations().subscribe((c) => {
      this.config = c;
    })
  }

  ngOnInit() {
    console.log(this.router.url);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.otpGenerated && changes.otpGenerated.currentValue) {
      console.log(changes);
      setTimeout(() => {
        document.getElementById("opttxt").focus();
      }, 500);
    }

    if (changes && changes.otpFailed && changes.otpFailed.currentValue) {
      this.mobileNumber = changes.otpFailed.currentValue
    }

  }

  //Signin with facebook
  signinWithFacebook() {
    console.log("submit login to facebook");

    window.open(`${this.config.facebook.auth_uri}?client_id=${this.config.facebook.clientId}&response_type=token,code&redirect_uri=${this.config.facebook.redirectUrl}${this.router.url}?state=${this.config.facebook.urlState}&scope=email&state={${this.config.facebook.urlState}}`, '_self');
  }


  signinWithGoogle() {
    console.log("submit login to google", encodeURIComponent(this.config.google.redirectUrl));
    window.open(`${this.config.google.auth_uri}?scope=profile email&include_granted_scopes=true&state=${this.config.google.urlState}&redirect_uri=${encodeURIComponent(this.config.google.redirectUrl)}${encodeURIComponent(this.router.url)}&response_type=token&client_id=${this.config.google.client_id}`, '_self');
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
    this.numberError =null;
    this.mobileNumber = null;
    this.otpResend = false;
    this.requestForOtp.emit(this.mobileNumber);
    setTimeout(() => {
      document.getElementById("Phone-Number").focus();
    }, 500);
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
    if (this.mobileNumber.toString().length !== 10) {
      return false
    }
    return true;
  }

}
