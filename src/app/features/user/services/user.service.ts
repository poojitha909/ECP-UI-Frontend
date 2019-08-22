import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiConstants } from 'src/app/api.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile, User } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  createUserProfile(userData: UserProfile): Observable<UserProfile> {
    return this.http.post<any>(ApiConstants.USER_PROFILE, userData).pipe(
      map
        ((response) => {
          if (response.data.basicProfileInfo && response.data.basicProfileInfo.firstName) {
            let currentUser: User = this.auth.user;
            currentUser.userName = response.data.basicProfileInfo.firstName;
            currentUser.hasProfile = true;
            this.auth.user = currentUser;
          } else if (response.data.sessionId) {
            this.auth.userSession = response.data.sessionId;
            this.auth.user = response.data.user;
          }
          return response.data;
        })
    );
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<any>(`${ApiConstants.USER_PROFILE}/${this.auth.user.id}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }
}
