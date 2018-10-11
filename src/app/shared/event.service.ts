import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Event, Location, Session} from '../events/models/event';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: Event[] = [];

  constructor(private http: HttpClient) {
    const e1 = createEvent();
    const e2 = createEvent();

    this.events = [e1, e2];
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('/api/events')
      .pipe(catchError(this.handleError<Event[]>('getEvents', [])));
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>('/api/events/' + id)
      .pipe(catchError(this.handleError<Event>('getEvent')));
  }

  saveEvent(event: Event): any {

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post<Event>('api/events', event, options)
    .pipe(catchError(this.handleError<Event>('saveEvent')));
  }

  updateEvent(event: Event): any {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.put<Event>('api/events', event, options)
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

function createEvent(): Event {
  const e = new Event();
  e.id = 1;
  e.name = 'Angular Connect';
  e.date = new Date(2036, 9, 9);
  e.time = '10:00 am';
  e.price = 599.99;
  e.imageUrl = '/assets/images/angularconnect-shield.png';
  e.onlineUrl = 'my-url';
  e.location = new Location();
  e.location.address = '1057 DT';
  e.location.city = 'London';
  e.location.country = 'Engalnd';
  e.sessions = [
    {
      id: 1,
      abstract: 'dfdf',
      duration: 2,
      name: 'fghg',
      level: 'Intermediate',
      voters: ['1', '2', '3', '4'],
      presenter: 'ghhfgh'
    }
  ];

  return e;
}
