import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    //value from route params
    this.activeroute.queryParams.subscribe(({ state }) => {
      if (state === environment.facebook.urlState) {
        const loginResponse = this.queryStringToJSON(window.location.href);
        console.log("loginResponse", loginResponse);
        if (loginResponse.access_token) {
          localStorage.setItem('loginCredential', loginResponse.access_token);
          this.getFbUserData();
        }
      }
    });
  }

  //Fetch Facebook access token from query param
  queryStringToJSON(queryString): any {
    if (queryString.indexOf('?') > -1) {
      queryString = queryString.split('?')[1];
    }
    let pairs = queryString.split('&');
    let result = {};
    pairs.forEach((pair, index) => {
      if (index == 0) {
        pair = pair.split('#');
        // console.log('token', token);
        pair.forEach((value) => {
          pair = value.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        // pair = pair.split('=');
      } else {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      }
    });
    return result;
  }

  //Get Facebook user details
  getFbUserData() {
    this.isLoading = true;
    this.auth.getFbUserData().subscribe(data => {
      this.user = data;
      this.verifiedString = `Welcome ${this.user.name}`;
      console.log(data);
      this.isLoading = false;
    },
      error => {
        console.log(error)
        this.isLoading = false;
      });
  }

}
