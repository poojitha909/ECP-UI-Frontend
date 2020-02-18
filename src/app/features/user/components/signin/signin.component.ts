import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { User, UserIdType } from 'src/app/core/interfaces';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoading: boolean;
  isOtpGenerated: boolean;
  verifiedString: string;
  errorMessage: string;
  user: any;
  config: any;

  constructor(
    private activeroute: ActivatedRoute,
    private auth: AuthService,
    private configServ: ConfigurationService,
    private router: Router) {
      this.configServ.loadConfigurations().subscribe( (c) => {
        this.config = c;
      })
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
        this.userSignIn(data)
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
        this.userSignIn(data)
      }
    },
      error => {
        console.log(error)
        this.isLoading = false;
      });
  }

  //SignIn user using api
  userSignIn(userData) {
    this.errorMessage = null;
    const user: User = {
      email: userData.email,
      userIdType: UserIdType.EMAIL
    };

    if (userData.phoneNumber) {
      user.phoneNumber = userData.phoneNumber;
      user.userIdType = UserIdType.MOBILE;
    }
    this.auth.login(user).subscribe(
      userData => {
        this.user = userData;
        this.verifiedString = `Welcome ${this.user.userName}`;
        this.isLoading = false;
        this.router.navigateByUrl("/");
        console.log("login response", userData);
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
      this.auth.sendOtp(number).subscribe(response => {
        console.log(response);
        if (response.type === "success") {
          this.isOtpGenerated = true;
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

  verfiyOtp(verification) {
    this.isLoading = true;
    this.auth.verfiyOtp(verification.number, verification.code).subscribe(response => {
      console.log(response);
      if (response.type === "success") {
        const user = {
          email: "",
          phoneNumber: verification.number,

        }
        this.userSignIn(user);
      }
    },
      error => {
        console.log(error);
      });
  }

  resendOtp(number) {
    if (number) {
      this.auth.resendOtp(number).subscribe(response => {
        console.log(response);
        if (response.type === "success") {
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
}
