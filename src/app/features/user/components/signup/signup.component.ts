import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { User, SocialAccount, UserIdType, OtpErrorMessage } from 'src/app/core/interfaces';
import { UserService } from '../../services/user.service';
import { ConfigurationService } from 'src/app/core/services/configuration.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  welcomeText:boolean;
  isOtpGenerated: boolean;
  isLoading: boolean;
  verifiedString: string;
  errorMessage: string;
  user: any;
  config: any;

  constructor(
    private activeroute: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private configServ: ConfigurationService,
    private router: Router) {

    this.configServ.loadConfigurations().subscribe((c) => {
      this.config = c;
    })
    this.user = this.auth.user;
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
            // localStorage.setItem('loginCredential', loginResponse.access_token);
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


  //Get Facebook user details
  getFbUserData(token) {
    this.isLoading = true;
    this.auth.getFbUserData(token).subscribe(data => {
      if (data) {
        this.userSignup(data, SocialAccount.FACEBOOK);
      }
    },
      error => {
        console.log(error)
        this.isLoading = false;
      });
  }

  //Get Google user details
  getGoogleUserData(token) {
    this.isLoading = true;
    this.auth.getGoogleUserData(token).subscribe(data => {
      if (data) {
        this.userSignup(data, SocialAccount.GOOGLE);
      }
    },
      error => {
        console.log(error)
        this.isLoading = false;
      });
  }

  //Signup using api 
  userSignup(userData, socialPlatform) {
    this.errorMessage = null;
    const user: User = {
      email: userData.email,
      userName: userData.name,
      userIdType: UserIdType.EMAIL,
      userRegType: UserIdType.EMAIL,
      socialSignOnId: userData.id,
      socialSignOnPlatform: socialPlatform
    }

    if (userData.phoneNumber) {
      user.phoneNumber = userData.phoneNumber;
      user.userRegType = UserIdType.EMAIL;
      user.userIdType = UserIdType.MOBILE;
    }

    this.auth.login(user).subscribe(
      userData => {
        this.user = userData;
        this.verifiedString = `Welcome ${this.user.userName || this.user.email || this.user.phoneNumber}`;
        this.welcomeText =true;
        // this.isLoading = false;
        this.getUserProfile();
        console.log("signup response", userData)
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error.error.errorMsg;
        this.isOtpGenerated = false;
        console.log(error);
      });
  }

  requestForOtp(number) {
    if (number) {
      this.errorMessage = null;
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
    this.errorMessage = null;
    this.auth.verfiyOtp(verification.number, verification.code).subscribe(response => {
      console.log(response);
      if (response.type === "success") {
        const user = {
          email: "",
          name: verification.number,
          id: verification.number,
          phoneNumber: verification.number
        }
        this.userSignup(user, SocialAccount.MOBILE);
      } else {
        this.isLoading = false;
        if (response.message == OtpErrorMessage.otpNotVerified) {
          this.errorMessage = "Invalid Otp, Please Enter a Valid OTP Number !";
        } else {
          this.errorMessage = response.message;
        }
        this.isOtpGenerated = false;
      }
    },
      error => {
        console.log(error);
      });
  }

  resendOtp(number) {
    if (number) {
      // this.isLoading = true;
      this.auth.resendOtp(number).subscribe(response => {
        console.log(response);
        if (response.type === "success") {
        } else {
          if (response.message == OtpErrorMessage.maxRetry) {
            this.errorMessage = "Max resend otp count exceeded";
          } else {
            this.errorMessage = response.message;
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
    this.userService.getUserProfile().subscribe(
      userProfie => {
        if (userProfie.basicProfileInfo.firstName) {

          if (this.auth.redirectUrl) {
            const redirect = this.auth.redirectUrl;
            this.auth.removeRedirectUrl();
            this.router.navigateByUrl(redirect);
          } else {
            this.router.navigateByUrl("/");
          }
        } else {
          let user = this.auth.user;
          user.hasProfile = false;
          this.auth.user = user;
          this.isLoading = false;
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error.error.errorMsg;
        this.isOtpGenerated = false;
      }
    );
  }

}
