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

  getFbUserData(): Observable<any> {
    const accessToken = localStorage.getItem("loginCredential");
    const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;
    console.log("postData", accessToken);
    return this.http.get<any>(url).pipe(
      map((response) => {
        this.user$.next(response)
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
    return this.http.post<any>(ApiConstants.USER_SIGNUP, userData, { headers: authHeaders });
  }

  login(userCredentail: User): Observable<any> {
    return this.http.post<any>(ApiConstants.USER_LOGIN, userCredentail, { headers: authHeaders });
  }

  logout(): Observable<any> {
    return this.http.get<any>(ApiConstants.USER_LOGOUT);
  }

}
