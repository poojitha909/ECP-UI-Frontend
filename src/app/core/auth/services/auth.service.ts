import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { User, DBReviews, UserProfile } from '../../interfaces';
import { ApiConstants } from 'src/app/api.constants';

import { AppConstants } from 'src/app/app.constants';
import { StorageHelperService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<any>(this.user);

  constructor(private http: HttpClient, private storage: StorageHelperService) { }

  getFbUserData(token): Observable<any> {
    const url = `${ApiConstants.LOGIN_SOCIAL_USER}?token=${token}&platform=facebook`;// https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.data && response.data.sessionId) {
          this.userSession = response.data.sessionId;
          this.user = response.data.user;
          this.user$.next(response.data.user);
        } else {
          this.user = response.data;
        }
        return response.data;
      })
    );
  }

  getGoogleUserData(token): Observable<any> {
    const url = `${ApiConstants.LOGIN_SOCIAL_USER}?token=${token}&platform=google`;// `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.data && response.data.sessionId) {
          this.userSession = response.data.sessionId;
          this.user = response.data.user;
          this.user$.next(response.data.user);
        } else {
          this.user = response.data;
        }
        return response.data;
      })
    );
  }

  sendOtp(mobileNo): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(ApiConstants.SEND_OTP, `mobile=${mobileNo}`, options).pipe(
      map((response) => {
        return JSON.parse(response.data);
      })
    );
  }

  resendOtp(mobileNo): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(ApiConstants.RESEND_OTP, `mobile=${mobileNo}`, options).pipe(
      map((response) => {
        return JSON.parse(response.data);
      })
    );
  }

  verfiyOtp(mobileNo, code): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(ApiConstants.LOGIN_OTP, `mobile=${mobileNo}&otp=${code}`, options).pipe(
      map((response) => {
        if (response.data && response.data.sessionId) {
          this.userSession = response.data.sessionId;
          this.user = response.data.user;
          this.user$.next(response.data.user);
        } else {
          this.user = response.data;
        }
        return response.data;

      })
    );
  }

  verfiyOtpWithoutLogin(mobileNo, code): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(ApiConstants.LOGIN_OTP, `mobile=${mobileNo}&otp=${code}`, options).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  registerUser(userProfile: UserProfile): Observable<UserProfile> {
    if (userProfile.basicProfileInfo.primaryPhoneNo || userProfile.basicProfileInfo.primaryEmail) {
      const temp = this.user;
      temp.phoneNumber = userProfile.basicProfileInfo.primaryPhoneNo;
      temp.email = userProfile.basicProfileInfo.primaryEmail;
      this.user = temp;
    }
    return this.http.post<any>(`${ApiConstants.USER_SIGNUP}`, this.user).pipe(
      map
        ((response) => {
          if (response.data && response.data.sessionId) {
            this.userSession = response.data.sessionId;
            this.user = response.data.user;
            this.user$.next(response.data.user);
            userProfile.userId = response.data.user.id;
          }
          return response.data;
        }),
      switchMap(() => this.http.post<any>(`${ApiConstants.USER_PROFILE}`, userProfile).pipe(
        map
          ((response) => {
            if (response.data.basicProfileInfo.firstName !== this.user.userName) {
              let currentUser: User = this.user;
              currentUser.userName = response.data.basicProfileInfo.firstName;
              this.user = currentUser;
            }
            return response.data;
          })
      ))
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(ApiConstants.USER_LOGOUT).pipe(map(response => {
      if (response) {
        this.clearUserStorage();
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
   * Set user details
   */
  set user(user: User) {
    this.storage.store(AppConstants.USER, JSON.stringify(user));
  }

  /**
  * Return user session details
  */
  get userSession(): string {
    return this.storage.retrieve(AppConstants.AUTH_SESSION);
  }

  /**
  * Set user session details
  */
  set userSession(sessionId: string) {
    this.storage.store(AppConstants.AUTH_SESSION, sessionId);
  }

  /**
   * Set redirect url 
   */
  set redirectUrl(redirect: string) {
    this.storage.store(AppConstants.REDIRECT_URL, redirect);
  }

  get redirectUrl(): string {
    return this.storage.retrieve(AppConstants.REDIRECT_URL);
  }

  set serviceReviewForm(data: DBReviews) {
    this.storage.store(AppConstants.REVIEW_SERVICE, JSON.stringify(data));
  }

  get serviceReviewForm(): DBReviews {
    return this.storage.retrieve(AppConstants.REVIEW_SERVICE) ? JSON.parse(this.storage.retrieve(AppConstants.REVIEW_SERVICE)) : undefined;
  }

  set serviceRatingForm(data: DBReviews) {
    this.storage.store(AppConstants.RATEING_SERVICE, JSON.stringify(data));
  }

  get serviceRatingForm(): DBReviews {
    return this.storage.retrieve(AppConstants.RATEING_SERVICE) ? JSON.parse(this.storage.retrieve(AppConstants.RATEING_SERVICE)) : undefined;
  }

  removeServiceReviewForm() {
    this.storage.clear(AppConstants.REVIEW_SERVICE);
  }

  removeServiceRatingForm() {
    this.storage.clear(AppConstants.RATEING_SERVICE);
  }

  removeRedirectUrl() {
    this.storage.clear(AppConstants.REDIRECT_URL);
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

  clearUserStorage() {
    this.storage.clear()
  }

}
