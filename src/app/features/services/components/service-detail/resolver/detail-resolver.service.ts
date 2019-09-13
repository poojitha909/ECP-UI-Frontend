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

    const routedata: any = this.router.getCurrentNavigation().extras.state;
    console.log(routedata);
    if (routedata) {
      if (routedata.isDBService) {
        return of(routedata.service)
      } else {
        return this.epcService.getJDServiceDetail(routedata.service.name, routedata.service.docid)
          .pipe(
            map(response => {
              if (response) {
                return response;
              }
            }),
            catchError(error => {
              console.log(error);
              this.router.navigateByUrl('services/not-found');
              return of(null);
            })
          );
      }
    } else {
      this.router.navigateByUrl('/services');
      return of(null);
    }
  }

}