import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';


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

    
    localStorage.setItem(key, CryptoJS.AES.encrypt(value, environment.encryptKey));
  }

  /**
   * Store data to session storage
   * @param key 
   * @param value 
   */
  public storeSession(key: string, value: any) {

  
    sessionStorage.setItem(key, CryptoJS.AES.encrypt(value, environment.encryptKey));
  }

  /**
   * Retrieve session data
   * @param key 
   */
  public retrieveSession(key: string): any {
    if (key && sessionStorage.getItem(key)) {
      return CryptoJS.AES.decrypt(sessionStorage.getItem(key), environment.encryptKey).toString(CryptoJS.enc.Utf8);
    }
    return;
  }



  /**
   * Retrieve data from LS
   * @param key 
   */
  public retrieve(key: string): any {
    if (key && localStorage.getItem(key)) {
      return CryptoJS.AES.decrypt(localStorage.getItem(key), environment.encryptKey).toString(CryptoJS.enc.Utf8);
    }
    return;
  }

  /**
   * Clear session storage
   * @param key 
   */
  public clearSession(key?: string) {
    
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
    
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  }
}
