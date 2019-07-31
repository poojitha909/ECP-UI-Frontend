import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core';
import { User } from 'src/app/core/interfaces';


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
    //value from route params
    this.activeroute.queryParams.subscribe(({ state }) => {
      if (state === environment.facebook.urlState) {
        const loginResponse = this.auth.queryStringToJSON(window.location.href);
        console.log("loginResponse", loginResponse);
        if (loginResponse.access_token) {
          localStorage.setItem('loginCredential', loginResponse.access_token);
          this.getFbUserData();
        }
      }
    });

  }


  //Get Facebook user details
  getFbUserData() {
    this.isLoading = true;
    this.auth.getFbUserData().subscribe(data => {
      if (data) {
        this.user = data;
        this.verifiedString = `Welcome ${this.user.name}`;
        console.log(data);
        this.isLoading = false;

        const user: User = {
          email: data.email,
          userName: data.name,
          userIdType: 0,
          userRegType: 0,
          socialSignOnId: data.id,
          socialSignOnPlatform: 'facebook'

        }
        this.auth.signup(user).subscribe(
          userData => console.log("signup response", userData),
          error => {
            console.log(error);
          });
      }
    },
      error => {
        console.log(error)
        this.isLoading = false;
      });
  }

}
