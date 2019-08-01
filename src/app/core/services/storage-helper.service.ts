import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {

  constructor(
    private storage: LocalStorageService
  ) { }

  /**
   * Store data to LS
   * @param key 
   * @param value 
   */
  public store(key: string, value: any) {

    this.storage.store(key, CryptoJS.AES.encrypt(value));
  }

  /**
   * Retrieve data from LS
   * @param key 
   */
  public retrieve(key: string): any {
    if (key && this.storage.retrieve(key)) {
      return CryptoJS.AES.decrypt(this.storage.retrieve(key));
    }
    return;
  }

  /**
   * Clear LS
   */
  public clear(key?: string) {
    this.storage.clear(key);
  }
}
