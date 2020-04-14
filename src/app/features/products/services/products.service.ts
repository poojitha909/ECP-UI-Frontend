import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {

    selectedCatId: string;
    selectedCatname: string;

    private productUrl = ApiConstants.PRODUCTS_SERVICES;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    searchProducts(searchPageParams: any): Observable<any[]> {
        let queryParams = "";
        Object.keys(searchPageParams)
            .forEach((key, i) => {
                if (i > 0) {
                    queryParams += `&${key}=${searchPageParams[key]}`;
                } else {
                    queryParams += `${key}=${searchPageParams[key]}`;
                }
            });
        if (queryParams == "") {
            return of([]);
        }
        return this.http.get<any[]>(`${this.productUrl}/page?${queryParams}`);
    }

    searchProductsCount(searchPageParams: any): Observable<any[]> {
        let queryParams = "";
        Object.keys(searchPageParams)
            .forEach((key, i) => {
                if (i > 0) {
                    queryParams += `&${key}=${searchPageParams[key]}`;
                } else {
                    queryParams += `${key}=${searchPageParams[key]}`;
                }
            });
        if (queryParams == "") {
            return of([]);
        }
        return this.http.get<any[]>(`${this.productUrl}/count?${queryParams}`);
    }

    getProduct(productId: string): Observable<any[]> {
        let queryParams = "productId=" + productId;
        return this.http.get<any[]>(`${this.productUrl}?${queryParams}`);
    }

    addProduct(product: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.productUrl}`, { ...product });
    }

    getCategoryList(): Observable<any[]> {
        return this.http.get<any[]>(`${this.productUrl}/category/page?p=0&s=10000`);
    }

    getCategoryListFiltered(searchTxt): Observable<any[]> {
      return this.http.get<any[]>(`${this.productUrl}/category/page?p=0&s=10000&searchTxt=${searchTxt}`);
    }

    addReview(review: any) {
        return this.http.post<any[]>(`${this.productUrl}/review`, review);
    }

    getReviewList(productId, reviwePaginate: any): Observable<any[]> {
        return this.http.get<any[]>(`${this.productUrl}/review/page?productId=${productId}&p=${reviwePaginate.p}&s=${reviwePaginate.s}`);
    }


  likeUnlikeReview(reviewId: string): Observable<any> {
    return this.http.put<any>(`${this.productUrl}/likeReview?reviewId=${reviewId}`, {}).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  addRating(rating: any): Observable<any> {
    return this.http.post<any>(`${this.productUrl}/addRating`, rating).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

  getRatings(productId: string): Observable<any> {
    return this.http.get<any>(`${this.productUrl}/ratings?productId=${productId}`).pipe(
      map(response => {
        if (response) {
          return response.data;
        }
      }));
  }

}
