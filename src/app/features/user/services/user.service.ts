import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiConstants } from 'src/app/api.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from 'src/app/core/interfaces';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUserProfile(userData: UserProfile): Observable<UserProfile> {
    return this.http.post<any>(ApiConstants.USER_PROFILE, userData, { headers: authHeaders }).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }
}
