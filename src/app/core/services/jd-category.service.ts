import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JDCategory, Category } from '../interfaces';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JdCategoryService {
  serviceCategories: Category[];
  constructor(private http: HttpClient) { }

  fetchAllCategories(): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_SERVICE_CATEGORIES}`).pipe(
      map(response => {
        if (response && response.data) {
          this.serviceCategories = response.data
          return response.data
        }
      })
    );
  }
}
