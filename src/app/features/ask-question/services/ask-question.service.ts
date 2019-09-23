import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AskQuestionService {
    private askQuestionUrl = ApiConstants.ASK_QUESTION_SERVICES;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    experts(searchPageParams: any): Observable<any[]> {
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
        return this.http.get<any[]>(`${this.askQuestionUrl}/experts/page?${queryParams}`);
    }

    getCategoryList(): Observable<any[]> {
        return this.http.get<any[]>(`${this.askQuestionUrl}/category/page?p=0&s=10000`);
    }

    searchAskQuestion(searchPageParams: any): Observable<any[]> {
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
        return this.http.get<any[]>(`${this.askQuestionUrl}/page?${queryParams}`);
    }

    searchAskQuestionCount(searchPageParams: any): Observable<any[]> {
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
        return this.http.get<any[]>(`${this.askQuestionUrl}/count?${queryParams}`);
    }

    getAskQuestion(askQuesId: string): Observable<any[]> {
        let queryParams = "askQuesId=" + askQuesId;
        return this.http.get<any[]>(`${this.askQuestionUrl}?${queryParams}`);
    }

    addProduct(product: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.askQuestionUrl}`,{...product});
    }

    

    addComment(productId: string, commentTxt: string, username: string , rating : number){
        return this.http.post<any[]>(`${this.askQuestionUrl}/review`,{
                productId: productId,
                review: commentTxt,
                userName: username,
                likeCount: 0,
                unlikeCount: 0,
                status: 0
            });        
    }

    getReviewList(productId): Observable<any[]> {
        return this.http.get<any[]>(`${this.askQuestionUrl}/review/page?p=0&s=10000&dir=1&sort=createdAt&productId=${productId}&searchTxt=&category=`);
    }
}
