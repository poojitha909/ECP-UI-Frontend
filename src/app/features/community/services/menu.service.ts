import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from 'src/app/api.constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private menuUrl = ApiConstants.MENU_SERVICES;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getMenus(parentId: string,searchTxt: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.menuUrl}/getMenu?parentId=${parentId}&searchTxt=${searchTxt}`);
    }
    getMenuItem(id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.menuUrl}/getMenu?id=${id}`);
    }
}
