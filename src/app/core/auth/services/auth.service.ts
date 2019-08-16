import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { User } from '../../interfaces';
import { ApiConstants } from 'src/app/api.constants';

import { AppConstants } from 'src/app/app.constants';
import { StorageHelperService } from '../../services';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<any>(this.user);

  constructor(private http: HttpClient, private storage: StorageHelperService) { }

  getFbUserData(token): Observable<any> {
    // const accessToken = localStorage.getItem("loginCredential");
    const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getGoogleUserData(token): Observable<any> {
    // const accessToken = localStorage.getItem("loginCredential");
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  sendOtp(mobileNo): Observable<any> {
    const url = `${ApiConstants.SEND_OTP}?mobile=${mobileNo}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return JSON.parse(response.data);
      })
    );
  }

  reSendOtp(mobileNo): Observable<any> {
    const url = `${ApiConstants.RESEND_OTP}?mobile=${mobileNo}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return JSON.parse(response.data);
      })
    );
  }

  verfiyOtp(mobileNo, code): Observable<any> {
    const url = `${ApiConstants.VERIFY_OTP}?mobile=${mobileNo}&otp=${code}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return JSON.parse(response.data);
      })
    );
  }

  signup(userData: User): Observable<any> {
    return this.http.post<any>(ApiConstants.USER_SIGNUP, userData, { headers: authHeaders }).pipe(
      map((response) => {
        this.user$.next(response.data.user);
        this.storage.store(AppConstants.USER, JSON.stringify(response.data.user));
        this.storage.store(AppConstants.AUTH_SESSION, response.data.sessionId);
        return response;
      })
    );
  }

  login(userCredentail: User): Observable<any> {
    return this.http.post<any>(ApiConstants.USER_LOGIN, userCredentail, { headers: authHeaders }).pipe(
      map((response) => {
        this.user$.next(response.data.user);
        this.storage.store(AppConstants.USER, JSON.stringify(response.data.user));
        this.storage.store(AppConstants.AUTH_SESSION, response.data.sessionId);
        return response;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(ApiConstants.USER_LOGOUT).pipe(map(response => {
      if (response) {
        this.storage.clear();
        this.user$.next(null);
      }
    }));
  }

  /**
  * Return user details
  */
  get user(): User {
    return this.storage.retrieve(AppConstants.USER) ? JSON.parse(this.storage.retrieve(AppConstants.USER)) : undefined;
  }

  /**
  * Return user details
  */
  get userSession(): User {
    return this.storage.retrieve(AppConstants.AUTH_SESSION);
  }

  /**
  * Return boolean if user data found in LS
  */
  get isAuthenticate(): boolean {
    return !!this.storage.retrieve(AppConstants.AUTH_SESSION);
  }

  /**
   * Return user as observable
   */
  get userSource(): Observable<User> {
    return this.user$.asObservable();
  }

  //Fetch  access token from url hash
  hashUrlToJSON(hash): any {
    let pairs = hash.split('&');
    let result = {};
    pairs.forEach((pair) => {
      const objpair = pair.split('=');
      result[objpair[0]] = decodeURIComponent(objpair[1] || '');
    });

    return result
  }

}
