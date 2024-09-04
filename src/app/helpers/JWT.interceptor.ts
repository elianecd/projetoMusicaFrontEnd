import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    constructor() {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //   debugger;
    //   const token = localStorage.getItem('token');
    //   // const newCloneRequest = request.clone({
    //   //   setHeaders: {
    //   //     'Authorization': `Bearer ${token}`
    //   //   }
    //   // })
    //
    //   if(token) {
    //     request = request.clone({
    //       headers: request.headers.set('Authorization', `Bearer ${token}`)
    //     });
    //   }
    //   return next.handle(request);
    // }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const newCloneRequest = request.clone({
  //       setHeaders: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     return next.handle(newCloneRequest);
  //   }
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    //console.log("TOKEN INTERCEPTOR: ", token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

}
