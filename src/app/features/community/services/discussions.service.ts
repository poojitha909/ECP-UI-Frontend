import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscussionService {
    private eventUrl = ApiConstants.DISCUSSIONS_SERVICES;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    // getEvents (): Observable<any[]> {
    //     return this.http.get<any[]>(this.eventUrl+ "/page");
    // }

    searchDiscussions(searchPageParams: any): Observable<any[]> {
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
        return this.http.get<any[]>(`${this.eventUrl}/page?${queryParams}`);
    }

    searchDiscussionsCount(searchPageParams: any): Observable<any[]> {
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
        return this.http.get<any[]>(`${this.eventUrl}/count?${queryParams}`);
    }

    getDiscussion(eventId: string): Observable<any[]> {
        let queryParams = "discussId=" + eventId;
        return this.http.get<any[]>(`${this.eventUrl}?${queryParams}`);
    }
}
