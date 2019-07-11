import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

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


}
