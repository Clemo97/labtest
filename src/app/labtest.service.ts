import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
HttpClient

@Injectable({
  providedIn: 'root'
})
export class LabtestService {

  _url = 'http://localhost:8000/api/labtest';
  constructor(private _http: HttpClient) { }

  register(userData: any) {
    return this._http.post<any>(this._url, userData);
  }
}
