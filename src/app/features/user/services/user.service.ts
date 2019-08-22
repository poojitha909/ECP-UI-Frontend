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
          if (response.data.basicProfileInfo.firstName) {
            let currentUser: User = this.auth.user;
            currentUser.userName = response.data.basicProfileInfo.firstName;
            this.auth.user = currentUser;
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
