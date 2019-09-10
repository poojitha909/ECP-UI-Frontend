import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JDCategory } from '../interfaces';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api.constants';

@Injectable({
  providedIn: 'root'
})
export class JdCategoryService {

  private allCategories: JDCategory[] = [];
  constructor(private http: HttpClient) { }

  get categories(): JDCategory[] {
    return this.allCategories
  }

  fetchAllCategories() {
    this.http.get<JDCategory[]>(`${ApiConstants.GET_JD_CATEGORIES}`).subscribe(
      response => {
        if (response) {
          this.allCategories = response;
        }
      });
  }
}
