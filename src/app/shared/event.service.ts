import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Event, Session} from '../events/models/event';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('/api/events');
    // .pipe(catchError(this.handleError<Event[]>('getEvents', [])));
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
