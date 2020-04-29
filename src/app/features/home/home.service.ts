import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from 'src/app/api.constants';
import { PageParam, serviceParam } from 'src/app/core';
import { map } from 'rxjs/operators';
import { StorageHelperService } from 'src/app/core/services';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  searchParam: PageParam = {
    p: 1,
    s: 5,
    term: ''
  }

  constructor(private http: HttpClient, private storageHelper: StorageHelperService) {
  }

  getServices(): Observable<any> {
    let queryParams: string = '';

    Object.keys(this.searchParam)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${this.searchParam[key]}`;
        } else {
          queryParams += `${key}=${this.searchParam[key]}`;
        }
      });
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(ApiConstants.GET_SERVICES, queryParams, options);
  }

  getCategoryServices(param: serviceParam): Observable<any> {
    let queryParams: string = '';

    Object.keys(param)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${param[key]}`;
        } else {
          queryParams += `${key}=${param[key]}`;
        }
      });

    return this.http.get(`${ApiConstants.GET_ALL_SERVICES}?${queryParams}`);
  }

  getAutoCompleteServices(): Observable<any> {
    let queryParams: string = '';

    Object.keys(this.searchParam)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${this.searchParam[key]}`;
        } else {
          queryParams += `${key}=${this.searchParam[key]}`;
        }
      });

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(ApiConstants.GET_SERVICES, queryParams, options).pipe(
      map(response => {
        if (response && response.data) {
          return response.data
        }
      })
    );
  }

  getHomeSearchPages(): Observable<any> {
    let queryParams: string = '';

    Object.keys(this.searchParam)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${this.searchParam[key]}`;
        } else {
          queryParams += `${key}=${this.searchParam[key]}`;
        }
      });

    return this.http.get<any>(`${ApiConstants.GET_HOME_SEARCH_PAGES}?${queryParams}`).pipe(
      map(response => {
        if (response && response.data) {
          return response.data
        }
      })
    );
  }

  /**
* Return user details
*/
  // get storageSearchResult(): any {
  //   return this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH_RESULT) ? JSON.parse(this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH_RESULT)) : undefined;
  // }

  // set storageSearchResult(searchResult) {
  //   this.storageHelper.storeSession(AppConstants.HOME_SEARCH_RESULT, JSON.stringify(searchResult));
  // }

  get homeSearchtxt(): string {
    return this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH) ? this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH) : undefined;
  }

  set homeSearchtxt(searchParam: string) {
    this.storageHelper.storeSession(AppConstants.HOME_SEARCH, searchParam);

  }

  get serviceCategory(): string {
    return this.storageHelper.retrieveSession(AppConstants.SERVICE_CATEGORY) ? this.storageHelper.retrieveSession(AppConstants.SERVICE_CATEGORY) : undefined;
  }

  set serviceCategory(serviceCategory: string) {
    this.storageHelper.storeSession(AppConstants.SERVICE_CATEGORY, serviceCategory);

  }

  get serviceSubCategory(): string {
    return this.storageHelper.retrieveSession(AppConstants.SERVICE_SUB_CATEGORY) ? this.storageHelper.retrieveSession(AppConstants.SERVICE_SUB_CATEGORY) : undefined;
  }

  set serviceSubCategory(serviceSubCategory: string) {
    this.storageHelper.storeSession(AppConstants.SERVICE_SUB_CATEGORY, serviceSubCategory);
  }

  get productCategory(): string {
    return this.storageHelper.retrieveSession(AppConstants.PRODUCT_CATEGORY) ? this.storageHelper.retrieveSession(AppConstants.PRODUCT_CATEGORY) : undefined;
  }
  set productCategory(productCategory: string) {
    this.storageHelper.storeSession(AppConstants.PRODUCT_CATEGORY, productCategory);
  }
  get discussCategory(): string {
    return this.storageHelper.retrieveSession(AppConstants.DISCUSS_CATEGORY) ? this.storageHelper.retrieveSession(AppConstants.DISCUSS_CATEGORY) : undefined;
  }
  set discussCategory(discussCategory: string) {
    this.storageHelper.storeSession(AppConstants.DISCUSS_CATEGORY, discussCategory);
  }
  get eventIsPastEvents(): number {
    return this.storageHelper.retrieveSession(AppConstants.EVENT_IS_PAST_EVENTS) ? parseInt(this.storageHelper.retrieveSession(AppConstants.EVENT_IS_PAST_EVENTS)) : undefined;
  }
  set eventIsPastEvents(eventIsPastEvents: number) {
    this.storageHelper.storeSession(AppConstants.EVENT_IS_PAST_EVENTS, eventIsPastEvents.toString());
  }
  get expertCategory(): string {
    return this.storageHelper.retrieveSession(AppConstants.EXPERT_CATEGORY) ? this.storageHelper.retrieveSession(AppConstants.EXPERT_CATEGORY) : undefined;
  }
  set expertCategory(expertCategory: string) {
    this.storageHelper.storeSession(AppConstants.EXPERT_CATEGORY, expertCategory);
  }

  // clearHomepageSearch() {
  //   this.storageHelper.clearSession(AppConstants.HOME_SEARCH);
  //   this.storageHelper.clearSession(AppConstants.HOME_SEARCH_RESULT);
  // }

  getFeaturedServices(searchParam: PageParam): Observable<any> {
    let queryParams: string = '';

    Object.keys(searchParam)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${searchParam[key]}`;
        } else {
          queryParams += `${key}=${searchParam[key]}`;
        }
      });

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(ApiConstants.GET_SERVICES, queryParams, options);
  }

}
