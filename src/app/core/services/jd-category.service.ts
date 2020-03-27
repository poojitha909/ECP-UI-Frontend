import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JDCategory } from '../interfaces';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JdCategoryService {
  constructor(private http: HttpClient) { }

  fetchAllCategories(): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_SERVICE_CATEGORIES}`).pipe(
      map(response => {
        if (response && response.data) {
          return response.data
        }
      })
    );
  }
}
