import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root'})
export default class EventService {
    private eventUrl = 'http://localhost:8080/BY/api/v1/event';  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    // getEvents (): Observable<any[]> {
    //     return this.http.get<any[]>(this.eventUrl+ "/page");
    // }

    searchEvents(searchPageParams: any): Observable<any[]> {
        let queryParams = "";
        Object.keys(searchPageParams)
            .forEach((key, i) => {
                if (i > 0) {
                queryParams += `&${key}=${searchPageParams[key]}`;
                } else {
                queryParams += `${key}=${searchPageParams[key]}`;
                }
            });
        if(queryParams == ""){
            return of([]);
        }
        return this.http.get<any[]>(`${this.eventUrl}/page?${queryParams}`);
    }

    searchEventsCount(searchPageParams: any): Observable<any[]> {
        let queryParams = "";
        Object.keys(searchPageParams)
            .forEach((key, i) => {
                if (i > 0) {
                    queryParams += `&${key}=${searchPageParams[key]}`;
                } else {
                    queryParams += `${key}=${searchPageParams[key]}`;
                }
            });
        if(queryParams == ""){
            return of([]);
        }
        return this.http.get<any[]>(`${this.eventUrl}/count?${queryParams}`);
    }

    getEvent(eventId: string): Observable<any[]> {
        let queryParams = "eventId=" + eventId;
        return this.http.get<any[]>(`${this.eventUrl}?${queryParams}`);
    }
}