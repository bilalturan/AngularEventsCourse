import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpEvent,
    HttpHandler,
    HttpResponse,
    HttpEventType
} from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
     .pipe(
         tap(httpEvent => {
             if (httpEvent.type === HttpEventType.Response) {
             // modify response here
             httpEvent.headers.append('btu-response', 'Turan');
             console.log('In Interceptor HttpResponse');
           }
         })
    );
   }

}
