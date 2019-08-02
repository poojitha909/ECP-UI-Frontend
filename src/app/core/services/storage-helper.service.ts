import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
// import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class StorageHelperService {

  constructor() { }

  /**
   * Store data to LS
   * @param key 
   * @param value 
   */
  public store(key: string, value: any) {

    // this.storage.store(key, CryptoJS.AES.encrypt(value));
    localStorage.setItem(key, CryptoJS.AES.encrypt(value, environment.encryptKey));
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
      return CryptoJS.AES.decrypt(localStorage.getItem(key),environment.encryptKey).toString(CryptoJS.enc.Utf8);
    }
    return;
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
