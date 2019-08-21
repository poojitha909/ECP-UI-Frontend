import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscussionService {
    private discussionUrl = ApiConstants.DISCUSSIONS_SERVICES;
    private discussionDetailUrl = ApiConstants.DISCUSSION_DETAIL;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    summary(tags: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.discussionUrl}/summary?tagsData=${tags}`);
    }

    addDiscussion(discussType: string, text: string, title: string, userId: string, username:string,
             systemTags: string[], topicId: string[], contentType: number): Observable<any[]> {
        return this.http.post<any[]>(`${this.discussionUrl}`,{discussType,text,title,userId,username,systemTags,topicId,contentType});
    }
    
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
        return this.http.get<any[]>(`${this.discussionUrl}/page?${queryParams}`);
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
        return this.http.get<any[]>(`${this.discussionUrl}/count?${queryParams}`);
    }

    getDiscussion(discussId: string): Observable<any[]> {
        let queryParams = "discussId=" + discussId;
        return this.http.get<any[]>(`${this.discussionDetailUrl}?${queryParams}`);
    }
}
