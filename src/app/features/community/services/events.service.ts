import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export default class EventService {
    private eventUrl = 'http://localhost:8080/BY/api/v1/event';  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getEvents (): Observable<any[]> {
        return this.http.get<any[]>(this.eventUrl)
          .pipe(
            tap(_ => this.log('fetched events')),
            catchError(this.handleError<any[]>('getEvents', []))
          );
    }

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
        return this.http.get<any[]>(`${this.eventUrl}/page?${queryParams}`).pipe(
          tap(_ => this.log(`found events matching "${queryParams}"`)),
          catchError(this.handleError<any[]>('searchHeroes', []))
        );
    }


    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        //this.messageService.add(`HeroService: ${message}`);
    }
}