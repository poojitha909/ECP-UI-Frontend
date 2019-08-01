import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { User } from '../../interfaces';
import { ApiConstants } from 'src/app/api.constants';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  private user$ = new BehaviorSubject<any>(this.user);

  constructor(private http: HttpClient) { }

  getFbUserData(token): Observable<any> {
    // const accessToken = localStorage.getItem("loginCredential");
    const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  /**
  * Return user as observable
  */
  get userSource(): Observable<any> {
    return this.user$.asObservable();
  }

  signup(userData: User): Observable<any> {
    return this.http.post<any>(ApiConstants.USER_SIGNUP, userData, { headers: authHeaders }).pipe(
      map((response) => {
        this.user$.next(response);

        return response;
      })
    );
  }

  login(userCredentail: User): Observable<any> {
    return this.http.post<any>(ApiConstants.USER_LOGIN, userCredentail, { headers: authHeaders }).pipe(
      map((response) => {
        this.user$.next(response);

        return response;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(ApiConstants.USER_LOGOUT);
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


}
