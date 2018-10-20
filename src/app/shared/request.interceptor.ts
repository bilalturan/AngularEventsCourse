import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpEvent,
    HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
        setHeaders: {'btu-request': 'Turan'}
    });
    console.log('In Interceptor HttpRequest');

    return next.handle(modifiedRequest);
   }

}
