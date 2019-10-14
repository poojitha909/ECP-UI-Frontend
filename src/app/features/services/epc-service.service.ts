import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageParam, JDserviceParam } from 'src/app/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api.constants';
import { map } from 'rxjs/operators';
import { UserProfile, DBReviews } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EpcServiceService {

  searchedService: string;
  searchCatID: string;
  
  serviceParam: JDserviceParam = {
    max: 50,
    pageNo: 1
  }
  constructor(private http: HttpClient) { }

  getJDAllServices(): Observable<any> {
    let queryParams: string = "";

    Object.keys(this.serviceParam)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${this.serviceParam[key]}`;
        } else {
          queryParams += `${key}=${this.serviceParam[key]}`;
        }
      });

    return this.http.get<any>(`${ApiConstants.GET_ALL_JD_SERVICES}?${queryParams}`).pipe(
      map(response => {
        if (response) {
          return response.services;
        }
      }));
  }

  getAllServices(): Observable<any> {
    let queryParams: string = "";

    Object.keys(this.serviceParam)
      .forEach((key, i) => {
        if (i > 0) {
          queryParams += `&${key}=${this.serviceParam[key]}`;
        } else {
          queryParams += `${key}=${this.serviceParam[key]}`;
        }
      });

    return this.http.get<any>(`${ApiConstants.GET_ALL_SERVICES}?${queryParams}`).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  getJDServiceDetail(service: string, docId: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_JD_SERVICES_DETAIL}?service=${service}&docID=${docId}`);
  }

  getDBserviceDetail(id: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_DB_SERVICE_DETAIL}/${id}`);
  }

  getDBserviceReview(id: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_DB_SERVICE_REVIEWS}?serviceId=${id}&p=0&s=1000`).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  addDBserviceReview(review: DBReviews): Observable<any> {
    return this.http.post<any>(`${ApiConstants.ADD_DB_SERVICE_REVIEWS}`, review).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  addDBserviceReport(reportData: any): Observable<any> {
    return this.http.post<any>(`${ApiConstants.ADD_DB_SERVICE_REPORT}`, reportData).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  likeUnlikeReview(reviewId: string, like: boolean): Observable<any> {
    return this.http.put<any>(`${ApiConstants.ADD_LIKE_SERVICE_REVIEWS}?reviewId=${reviewId}&like=${like}`, {}).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

}
