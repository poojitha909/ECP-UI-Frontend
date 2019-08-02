import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { User, SocialAccount } from 'src/app/core/interfaces';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading: boolean;
  verifiedString: string;
  user: any;

  constructor(private activeroute: ActivatedRoute, private auth: AuthService) { }

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
        this.user = data;
        this.verifiedString = `Welcome ${this.user.name}`;
        console.log(data);
        this.isLoading = false;
        console.log(SocialAccount.FACEBOOK);
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
        this.user = data;
        this.verifiedString = `Welcome ${this.user.name}`;
        console.log(data);
        this.isLoading = false;
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
    const user: User = {
      email: userData.email,
      userName: userData.name,
      userIdType: 0,
      userRegType: 0,
      socialSignOnId: userData.id,
      socialSignOnPlatform: socialPlatform

    }
    this.auth.signup(user).subscribe(
      userData => console.log("signup response", userData),
      error => {
        console.log(error);
      });
  }

}
