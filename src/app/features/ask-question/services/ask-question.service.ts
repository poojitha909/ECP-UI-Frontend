import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AskQuestionService {
    private askQuestionUrl = ApiConstants.ASK_QUESTION_SERVICES;
    private userProfileUrl= ApiConstants.USER_PROFILE;
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

    questions(searchPageParams: any): Observable<any[]> {
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

    getCategoryList(): Observable<any[]> {
        return this.http.get<any[]>(`${this.askQuestionUrl}/category/page?p=0&s=10000`);
    }

    addQuestion(question: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.askQuestionUrl}`,{...question});
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
    getAskQuesReplies(askQuesId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.askQuestionUrl}/reply/page?p=0&s=10000&dir=1&sort=createdAt&questionId=${askQuesId}`);
    }

    getUserProfile(profileId): Observable<any[]> {
        return this.http.get<any[]>(`${this.userProfileUrl}/profile/${profileId}`);
    }

    getUserProfileById(userId): Observable<any[]> {
        return this.http.get<any[]>(`${this.userProfileUrl}/${userId}`);
    }

    addComment(questionId: string, commentTxt: string, user: any){
        return this.http.post<any[]>(`${this.askQuestionUrl}/reply`,{
                askQuestionId: questionId,
                reply: commentTxt,
                user: {id: user.id}
            });
    }
}
