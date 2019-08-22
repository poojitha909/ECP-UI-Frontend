import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { User, SocialAccount, UserIdType } from 'src/app/core/interfaces';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isOtpGenerated: boolean;
  isLoading: boolean;
  verifiedString: string;
  errorMessage: string;
  user: any;

  constructor(
    private activeroute: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    if (window.location.hash) {
      //Get hash string From url
      const hash = window.location.hash.replace("#", "");
      const loginCred = this.auth.hashUrlToJSON(hash);

      //value from route params
      this.activeroute.queryParams.subscribe(({ state }) => {
        if (state === environment.facebook.urlState) {
          if (loginCred.access_token) {
            // localStorage.setItem('loginCredential', loginResponse.access_token);
            this.getFbUserData(loginCred.access_token);
          }
        } else {
          if (loginCred.state === environment.google.urlState) {
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
        this.errorMessage = response.message;
        this.isOtpGenerated = false;
      }
    },
      error => {
        console.log(error);
      });
  }

  resendOtp(number) {
    if (number) {
      this.isLoading = true;
      this.auth.resendOtp(number).subscribe(response => {
        console.log(response);
        if (response.type === "success") {
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
    console.log(number);
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      userProfie => {
        if (userProfie.basicProfileInfo.firstName) {
          this.router.navigateByUrl("/");
        } else {
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
