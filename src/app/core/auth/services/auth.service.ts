import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getFbUserData(): Observable<any> {
    const accessToken = localStorage.getItem("loginCredential");
    const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;
    console.log("postData", accessToken);
    return this.http.get<any>(url);
  }

}
