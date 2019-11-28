import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from 'src/app/api.constants';
import { PageParam } from 'src/app/core';
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

    return this.http.get(`${ApiConstants.GET_SERVICES}?${queryParams}`);
  }

  getCategoryServices(param: PageParam): Observable<any> {
    let queryParams: string = '';

    Object.keys(param)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${param[key]}`;
        } else {
          queryParams += `${key}=${param[key]}`;
        }
      });

    return this.http.get(`${ApiConstants.GET_SERVICES}?${queryParams}`);
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

    return this.http.get<any>(`${ApiConstants.GET_SERVICES}?${queryParams}`).pipe(
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
  get storageSearchResult(): any {
    return this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH_RESULT) ? JSON.parse(this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH_RESULT)) : undefined;
  }

  set storageSearchResult(searchResult) {
    this.storageHelper.storeSession(AppConstants.HOME_SEARCH_RESULT, JSON.stringify(searchResult));
  }

  get homeSearchtxt(): string {
    return this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH) ? this.storageHelper.retrieveSession(AppConstants.HOME_SEARCH) : undefined;
  }

  set homeSearchtxt(searchParam: string) {
    this.storageHelper.storeSession(AppConstants.HOME_SEARCH, searchParam);

  }

  clearHomepageSearch() {
    this.storageHelper.clearSession(AppConstants.HOME_SEARCH);
    this.storageHelper.clearSession(AppConstants.HOME_SEARCH_RESULT);
  }

}
