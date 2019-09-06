import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EpcServiceService } from '../../../epc-service.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailResolverService implements Resolve<any> {

  constructor(private router: Router, private epcService: EpcServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any | null> {

    const service = route.params['name'];
    const docId = route.params['docId'];

    return this.epcService.getJDServiceDetail(service, docId)
      .pipe(
        map(response => {
          if (response) {
            return response;
          }
        }),
        catchError(error => {
          console.log(error);
          this.router.navigateByUrl('/error');
          return of(null);
        })
      )
  }

}