import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/usuarios';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    let url: string = '/login';
    return this.http.post<any>(this.apiURL + url, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/novo-registro`, { username, password });
  }
}
