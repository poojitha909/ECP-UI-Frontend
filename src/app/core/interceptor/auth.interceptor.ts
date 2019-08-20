import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private auth: AuthService) { }

    private get router(): Router {
        //this creates router property on your service.
        return this.injector.get(Router);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        let headers: HttpHeaders = req.headers;

        if (!headers) {
            headers = headers.append('Content-Type', 'application/json');
            headers = headers.append('Accept', 'application/json')
        }

        const sessionId = this.auth.userSession;
        if (sessionId) {
            headers = headers.append('sess', sessionId);
        }

        const authReq = req.clone({ headers: headers });

        return <any>next.handle(authReq).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        // case 401:
                        // this.storage.clear();
                        // const redirectUrl = encodeURIComponent(window.location.href);

                        // window.location.href = `${ENV.PUBLIC_APP}/sign-in?appType=${AppType.Dashboard}&url=${redirectUrl}`;
                        // return of();
                        case 400:
                            this.auth.logout();
                            return of();
                        default:
                            return observableThrowError(error);
                    }

                }
                return observableThrowError(error);
            })
        );
    }
}
