import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JDCategory, Category, serviceParam } from '../interfaces';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JdCategoryService {
  // serviceCategories: Category[];
  constructor(private http: HttpClient) { }

  fetchAllCategories(param:serviceParam): Observable<any> {

    let queryParams: string = '';

    Object.keys(param)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${param[key]}`;
        } else {
          queryParams += `${key}=${param[key]}`;
        }
      });

    return this.http.get<any>(`${ApiConstants.GET_SERVICE_CATEGORIES}?${queryParams}`).pipe(
      map(response => {
        if (response && response.data) {
          // this.serviceCategories = response.data
          return response.data
        }
      })
    );
  }
}
