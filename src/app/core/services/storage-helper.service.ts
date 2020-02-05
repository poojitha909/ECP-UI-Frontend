import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from './configuration.service';
// import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class StorageHelperService {

  config: any;

  constructor(private configServ: ConfigurationService) {
    this.configServ.loadConfigurations().subscribe( (c) => {
      this.config = c;
    })
   }

  /**
   * Store data to LS
   * @param key 
   * @param value 
   */
  public store(key: string, value: any) {

    // this.storage.store(key, CryptoJS.AES.encrypt(value));
    localStorage.setItem(key, CryptoJS.AES.encrypt(value, this.config.encryptKey));
  }

  /**
   * Store data to session storage
   * @param key 
   * @param value 
   */
  public storeSession(key: string, value: any) {

    // this.storage.store(key, CryptoJS.AES.encrypt(value));
    sessionStorage.setItem(key, CryptoJS.AES.encrypt(value, this.config.encryptKey));
  }

  /**
   * Retrieve session data
   * @param key 
   */
  public retrieveSession(key: string): any {
    if (key && sessionStorage.getItem(key)) {
      return CryptoJS.AES.decrypt(sessionStorage.getItem(key), this.config.encryptKey).toString(CryptoJS.enc.Utf8);
    }
    return;
  }



  /**
   * Retrieve data from LS
   * @param key 
   */
  public retrieve(key: string): any {
    // if (key && this.storage.retrieve(key)) {
    //   return CryptoJS.AES.decrypt(this.storage.retrieve(key));
    // }
    // return;
    if (key && localStorage.getItem(key)) {
      return CryptoJS.AES.decrypt(localStorage.getItem(key), this.config.encryptKey).toString(CryptoJS.enc.Utf8);
    }
    return;
  }

  /**
   * Clear session storage
   * @param key 
   */
  public clearSession(key?: string) {
    // this.storage.clear(key);
    if (key) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.clear();
    }
  }

  /**
   * Clear LS
   */
  public clear(key?: string) {
    // this.storage.clear(key);
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  }
}
