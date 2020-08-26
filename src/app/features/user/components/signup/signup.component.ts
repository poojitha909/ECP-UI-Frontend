import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { OtpErrorMessage } from 'src/app/core/interfaces';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
declare var UIkit: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  welcomeText: boolean;
  isOtpGenerated: boolean;
  otpFailedNumber: string
  isLoading: boolean;
  verifiedString: string;
  errorMessage: string;
  user: any;
  config: any;
  isNewUser: boolean;

  constructor(
    private activeroute: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    private configServ: ConfigurationService) {

    this.configServ.loadConfigurations().subscribe((c) => {
      this.config = c;
    });
    this.titleService.setTitle("Sign In - Joy of Age");
  }

  ngOnInit() {
    if (window.location.hash) {
      //Get hash string From url
      const hash = window.location.hash.replace("#", "");
      const loginCred = this.auth.hashUrlToJSON(hash);

      //value from route params
      this.activeroute.queryParams.subscribe(({ state }) => {
        if (state === this.config.facebook.urlState) {
          if (loginCred.access_token) {
            this.getFbUserData(loginCred.access_token);
          }
        } else {
          if (loginCred.state === this.config.google.urlState) {
            this.getGoogleUserData(loginCred.access_token);
          }
        }
      });
    }

  }

  ngAfterViewInit() {
    document.getElementById("signin-header").focus();
  }


  //Get Facebook user details
  getFbUserData(token) {
    this.isLoading = true;
    // UIkit.modal('#loading-modal').show();
    this.auth.getFbUserData(token).subscribe(data => {
      this.user = this.auth.user;
      // this.user = data.user;
      // this.verifiedString = `Welcome ${this.user.userName || this.user.email || this.user.phoneNumber}`;
      // this.welcomeText = true;
      this.getUserProfile();
    },
      error => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = error.error.error.errorMsg;
        this.isOtpGenerated = false;
        // UIkit.modal('#loading-modal').hide();
      });
  }

  //Get Google user details
  getGoogleUserData(token) {
    this.isLoading = true;
    // UIkit.modal('#loading-modal').show();
    this.auth.getGoogleUserData(token).subscribe(data => {
      this.user = this.auth.user;
      // this.user = data.user;
      // this.verifiedString = `Welcome ${this.user.userName || this.user.email || this.user.phoneNumber}`;
      // this.welcomeText = true;
      this.getUserProfile();
    },
      error => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = error.error.error.errorMsg;
        this.isOtpGenerated = false;
        // UIkit.modal('#loading-modal').hide();
      });
  }

  requestForOtp(number) {
    this.errorMessage = null;
    if (number) {
      this.auth.sendOtp(number).subscribe(response => {
        console.log(response);
        if (response.type === "success") {
          this.isOtpGenerated = true;
        } else {
          this.errorMessage = response.message;
          this.isOtpGenerated = false;
        }
      },
        error => {
          console.log(error);
        });
    } else {
      this.isOtpGenerated = false;
    }
  }

  verfiyOtp(verification) {
    this.isLoading = true;
    // UIkit.modal('#loading-modal').show();
    this.errorMessage = null;
    this.auth.verfiyOtp(verification.number, verification.code).subscribe(response => {
      if (response) {
        this.user = this.auth.user;
        this.getUserProfile();
        // this.verifiedString = `Welcome ${this.user.userName || this.user.email || this.user.phoneNumber}`;
        // this.welcomeText = true;
        // this.isLoading = false;
      } else {
        this.isLoading = false;
        // UIkit.modal('#loading-modal').hide();
        this.otpFailedNumber = verification.number;
        this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
      }
    },
      error => {
        console.log(error);
        this.isLoading = false;
        this.isOtpGenerated = false;
        // UIkit.modal('#loading-modal').hide();
      });
  }

  resendOtp(number) {
    if (number) {
      // this.isLoading = true;
      this.otpFailedNumber = null;
      this.errorMessage = null;
      this.auth.resendOtp(number).subscribe(response => {
        console.log(response);
        if (response.type === "success") {
        } else {
          if (response.message == OtpErrorMessage.maxRetry) {
            this.errorMessage = "Max resend otp count exceeded";
          }
          this.isOtpGenerated = false;
        }
      },
        error => {
          console.log(error);
        });
    } else {
      this.isOtpGenerated = false;
    }
    console.log(number);
  }

  getUserProfile() {
    if (this.auth.user && this.auth.user.id) {
      this.userService.getUserProfile().subscribe(
        userProfie => {
          if (userProfie.basicProfileInfo.firstName) {
            if (this.auth.redirectUrl) {
              const redirect = this.auth.redirectUrl;
              this.auth.removeRedirectUrl();
              this.router.navigateByUrl(redirect);
            }
            this.isNewUser = false;
            this.isLoading = false;
          } else {
            console.log(userProfie);
            this.isNewUser = true;
            this.isLoading = false;
          }
          // } else {
          //   let user = this.auth.user;
          //   user.hasProfile = false;
          //   this.auth.user = user;
          //   this.isNewUser = true;
          //   this.isLoading = false;
          // }
          // setTimeout(() => {
          //   UIkit.modal('#loading-modal').hide();
          // }, 3000);
        },
        error => {
          this.isNewUser = true;
          this.isLoading = false;
          this.isOtpGenerated = false;
          this.errorMessage = error.error.error.errorMsg;
          // UIkit.modal('#loading-modal').hide();
        }
      );
    } else {
      // let user = this.auth.user;
      // user.hasProfile = false;
      // this.auth.user = user;
      this.isNewUser = true;
      this.isLoading = false;
    }

  }

  doNotRegister() {
    this.auth.clearUserStorage();
    this.user = undefined;
    this.isOtpGenerated = false;
    this.router.navigateByUrl("/user/signin");
  }

}
