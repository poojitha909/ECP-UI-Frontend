import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiConstants } from 'src/app/api.constants';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { UserProfile, User } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from 'src/app/core/services/configuration.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  userProfile: UserProfile;
  config: any;
  private subject = new Subject<any>();
  constructor(
    private http: HttpClient,
    private configServ: ConfigurationService,
    private auth: AuthService) {

    this.configServ.loadConfigurations().subscribe((c) => {
      this.config = c;
    })
  }

  formEditMessage(message) {
    this.subject.next(message);
  }

  getFormEditMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  modalClose(closeModal) {
    this.subject.next(closeModal)
  }

  // editFormSection(editSection){
  //   console.log(editSection);
  //   this.subject.next(editSection)
  // }

  // geteditFormSection():Observable<any>{
  //   return this.subject.asObservable();
  // }

  profileLanguages(name?: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_LANGUAGES}?name=${name ? name : ""}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }

  profileHobbies(name?: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_HOBBIES}?name=${name ? name : ""}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }

  profileInterests(name?: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_INTERESTAREAS}?name=${name ? name : ""}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }

  profileEmotionalChallenges(name?: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_EMOTIONALCHALLENGES}?name=${name ? name : ""}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }

  profileHealthChallenges(name?: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_HEALTHCHALLENGES}?name=${name ? name : ""}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }

  profileOtherChallenges(name?: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_OTHERCHALLENGES}?name=${name ? name : ""}`).pipe(
      map
        ((response) => {
          return response.data;
        })
    );
  }


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

  changeUserName(user: User): Observable<User> {
    return this.http.post<any>(`${ApiConstants.USER_SIGNUP}`, user).pipe(
      map
        ((response) => {
          if (response && response.data) {
            let currentUser: User = this.auth.user;
            currentUser.userName = response.data.userName;
            this.auth.user = currentUser;
            return response.data;
          }
        })
    );
  }

  updateUserProfile(user: UserProfile): Observable<any> {
    user.userId = this.auth.user.id;
    if (user.basicProfileInfo.firstName !== this.auth.user.userName) {
      const userData: User = {
        id: user.userId,
        userName: user.basicProfileInfo.firstName
      }
      return this.changeUserName(userData).pipe(
        switchMap(() => this.http.put<any>(`${ApiConstants.USER_PROFILE}/${user.userId}`, user).pipe(
          map
            ((response) => {
              let currentUser: User = this.auth.user;
              currentUser.phoneNumber = response.data.basicProfileInfo.primaryPhoneNo;
              currentUser.email = response.data.basicProfileInfo.primaryEmail;
              this.auth.user = currentUser;
              return response.data;
            })
        ))
      )
    } else {
      return this.http.put<any>(`${ApiConstants.USER_PROFILE}/${user.userId}`, user).pipe(
        map
          ((response) => {
            let currentUser: User = this.auth.user;
            currentUser.phoneNumber = response.data.basicProfileInfo.primaryPhoneNo;
            currentUser.email = response.data.basicProfileInfo.primaryEmail;
            this.auth.user = currentUser;
            return response.data;
          })
      );
    }
  }

  uploadUserImage(userImage: FormData): Observable<any> {
    // let headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    if (userImage) {
      return this.http.post<any>(ApiConstants.IMAGE_UPLOAD, userImage).pipe(
        map((response) => {
          if (response && response.data) {
            this.userProfile.basicProfileInfo.profileImage = {
              thumbnailImage: this.config.imageBaseUrl + response.data[0]
            }
            return response.data;
          }

        }),
        mergeMap(val => this.updateUserProfile(this.userProfile))
      );
    } else {
      return this.updateUserProfile(this.userProfile);
    }
  }

  validateDate(value): boolean {
    // debugger;
    let dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if (value.match(dateformat)) {
      //Test which seperator is used '/' or '-'
      let opera1 = value.split('/');
      let opera2 = value.split('-');
      const lopera1 = opera1.length;
      const lopera2 = opera2.length;
      // Extract the string into month, date and year
      let pdate: any[];
      if (lopera1 > 1) {
        pdate = value.split('/');
      }
      else if (lopera2 > 1) {
        pdate = value.split('-');
      }
      const mm = parseInt(pdate[0]);
      const dd = parseInt(pdate[1]);
      const yy = parseInt(pdate[2]);
      // Create list of days of a month [assume there is no leap year by default]
      let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mm == 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
          // alert('Invalid date format!');
          return false;
        }
      }
      if (mm == 2) {
        let lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
          lyear = true;
        }
        if ((lyear == false) && (dd >= 29)) {
          // alert('Invalid date format!');
          return false;
        }
        if ((lyear == true) && (dd > 29)) {
          // alert('Invalid date format!');
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    else {
      // alert("Invalid date format!");
      return false;
    }
  }
}
