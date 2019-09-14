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

    const service: string = route.params['name'];
    const docId: string = route.params['docId'];
    const isDBService: string = route.params['dbservice'];

    if (isDBService === "true") {
      console.log(true);
      return this.epcService.getDBservice(docId)
        .pipe(
          map(response => {
            if (response && response.data) {
              return response.data;
            } else {
              this.router.navigateByUrl('services/not-found');
            }
          }),
          catchError(error => {
            console.log(error);
            this.router.navigateByUrl('services/not-found');
            return of(null);
          })
        );
    } else {
      return this.epcService.getJDServiceDetail(service, docId)
        .pipe(
          map(response => {
            if (response) {
              return response;
            } else {
              this.router.navigateByUrl('services/not-found');
            }
          }),
          catchError(error => {
            console.log(error);
            this.router.navigateByUrl('services/not-found');
            return of(null);
          })
        );
    }

  }
}