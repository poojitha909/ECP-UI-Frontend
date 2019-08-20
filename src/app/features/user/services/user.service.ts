import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiConstants } from 'src/app/api.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from 'src/app/core/interfaces';
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
          return response.data;
        })
    );
  }
}
