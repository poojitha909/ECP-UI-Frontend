import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { User } from 'src/app/core/interfaces';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoading: boolean;
  verifiedString: string;
  user: any;

  constructor(
    private activeroute: ActivatedRoute,
    private auth: AuthService) { }

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
        this.user = data;
        this.verifiedString = `Welcome ${this.user.name}`;
        console.log(data);
        this.isLoading = false;
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
    const user: User = {
      email: userData.email,
      userName: userData.name
    };

    this.auth.login(user).subscribe(
      userData => console.log("login response", userData),
      error => {
        console.log(error);
      });
  }

}
