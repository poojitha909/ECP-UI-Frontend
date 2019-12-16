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
    pageNo: 0
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

  getDBserviceReview(id: string, reviwePaginate: any): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_DB_SERVICE_REVIEWS}?serviceId=${id}&p=${reviwePaginate.p}&s=${reviwePaginate.s}`).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  addDBserviceReview(review: DBReviews): Observable<any> {
    return this.http.post<any>(`${ApiConstants.ADD_DB_SERVICE_REVIEWS}`, review).pipe(
      map(response => {
        if (response && response.data) {
          return response.data;
        }
      }));
  }

  deleteDBserviceReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`${ApiConstants.DELETE_DB_SERVICE_REVIEWS}/${reviewId}`).pipe(
      map(response => {
        if (response && response.data) {
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

  likeUnlikeReview(reviewId: string): Observable<any> {
    return this.http.put<any>(`${ApiConstants.ADD_LIKE_SERVICE_REVIEWS}?reviewId=${reviewId}`, {}).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  addServiceRating(rating: any): Observable<any> {
    return this.http.post<any>(`${ApiConstants.ADD_SERVICE_RATEING}`, rating).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  getServiceRatings(serviceId: string): Observable<any> {
    return this.http.get<any>(`${ApiConstants.GET_SERVICE_RATEINGS}?serviceId=${serviceId}`).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

}
