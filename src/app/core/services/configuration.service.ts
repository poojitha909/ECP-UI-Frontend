import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

interface Configuration {
    apiBaseUrl: string,
    imageBaseUrl: string,
    facebook: {
      clientId: string,
      urlState: string,
      redirectUrl: string,
      auth_uri: string
    },
    google: {
      client_id: string,
      urlState: string,
      redirectUrl: string,
      auth_uri: string,
    }
}

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  private configuration$: Observable<Configuration>;

  constructor(private http: HttpClient) {
  }

  public loadConfigurations(): any {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<Configuration>(`/assets/config.json`).pipe(
        shareReplay(1)
      );
    }
    console.log(this.configuration$);
    return this.configuration$;
  }

}