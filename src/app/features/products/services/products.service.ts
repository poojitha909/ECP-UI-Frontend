import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
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

    getProduct(eventId: string): Observable<any[]> {
        let queryParams = "productId=" + eventId;
        return this.http.get<any[]>(`${this.productUrl}?${queryParams}`);
    }

    addProducts(event: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.productUrl}`,{...event});
    }

    getCategoryList(): Observable<any[]> {
        return this.http.get<any[]>(`${this.productUrl}/category/page`);
    }
}
