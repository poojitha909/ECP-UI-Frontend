import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiConstants } from 'src/app/api.constants';
import { PageParam } from 'src/app/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getServices(param: PageParam): Observable<any> {
    let queryParams: string = '';

    Object.keys(param)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${param[key]}`;
        } else {
          queryParams += `${key}=${param[key]}`;
        }
      });

    return this.http.get(`${ApiConstants.GET_SERVICES}?${queryParams}`, httpOptions);
  }

}
