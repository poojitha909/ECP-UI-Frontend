import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import {AppConstants} from 'src/app/app.constants';
import { Observable, of } from 'rxjs';
import {StorageHelperService} from "../../../core/services/storage-helper.service";

@Injectable({ providedIn: 'root' })
export class DiscussionService {
    private discussionUrl = ApiConstants.DISCUSSIONS_SERVICES;
    private discussionDetailUrl = ApiConstants.DISCUSSION_DETAIL;
    private discussionReplyLikeUrl = ApiConstants.DISCUSSION_REPLY_LIKE;
    private discussionLikeUrl = ApiConstants.DISCUSSION_LIKE;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private storage: StorageHelperService) { }

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

    addComment(reqParams: any, discussId:string, parentReplyId:string, text:string): Observable<any[]> {
        let queryParams = "";
        Object.keys(reqParams)
            .forEach((key, i) => {
                if (i > 0) {
                    queryParams += `&${key}=${reqParams[key]}`;
                } else {
                    queryParams += `${key}=${reqParams[key]}`;
                }
            });
        if (queryParams == "") {
            return of([]);
        }
        const url = "/community/discussion/" + discussId;
        return this.http.post<any[]>(`${this.discussionDetailUrl}?${queryParams}`,{discussId,parentReplyId,text,url});
    }

    likeDiscussionReply(discussId:string): Observable<any[]> {
        const url = "/community/discussion/" + discussId;
        return this.http.post<any[]>(`${this.discussionLikeUrl}?type=0&discussId=${discussId}&url=${url}`,{discussId,url});
    }

    likeReply(discussId:string, replyId:string): Observable<any[]> {
        const url = "/community/discussion/" + discussId;
        return this.http.post<any[]>(`${this.discussionReplyLikeUrl}?type=1&replyId=${replyId}&url=${url}`,{replyId,url});
    }
}
