import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {Event, Session} from '../events/models/event';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


// ********** RxJs operators **********************
// An operator operate on obeservable and return an observable. Can be chained.
// Can be used to transform data

// pipe

// tap : does snot transform data but give you a way to do some code before returning the result
// map : transforms data to be received
// catchError


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[] | Error> {
    return this.http.get<Event[]>('/api/events')
    // Error handled by effect
    .pipe(
      catchError((err: HttpErrorResponse): Observable<Error> => {
        const dataError: Error = { msg: 'Error occured inside service'};
        return throwError(dataError);
      })
    );
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>('/api/events/' + id)
      .pipe(catchError(this.handleError<Event>('getEvent')));
  }

  saveEvent(event: Event): any {
    return this.http.post<Event>('api/events', event)
    .pipe(catchError(this.handleError<Event>('saveEvent')));
  }

  updateEvent(event: Event): any {
    // server does not support PUT. Given id post behaves like put
    return this.http.post<Event>('api/events', event)
    .pipe(catchError(this.handleError<Event>('saveEvent')));
  }

  searchSessions(searchTerm: string): Observable<Session[]> {
    return this.http.get<Session[]>('/api/sessions/search?search=' + searchTerm)
    .pipe(catchError(this.handleError<Session[]>('searchSessions')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}

export class Error {
  msg: string;
}
