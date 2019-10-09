import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiConstants } from 'src/app/api.constants';
import { PageParam } from 'src/app/core';
import { map, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  searchParam: PageParam = {
    p: 1,
    s: 5,
    term: ''
  }

  constructor(private http: HttpClient) {
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


}
