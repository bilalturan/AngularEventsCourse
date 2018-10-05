import { Injectable, Type } from '@angular/core';
import {Http} from '@angular/http';

import {Event, Location, Session} from '../events/models/event';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: Event[] = [];

  constructor(private http: Http) {
    const e1 = createEvent();
    const e2 = createEvent();

    this.events = [e1, e2];
  }

  getEvents(): Observable<Event[]> {

    const subject = new Subject<Event[]>();
    setTimeout( () => {
      subject.next(this.events);
      subject.complete();
    }, 100);

    return subject;
  }

  GetEvent(id: number): Event {
    return this.events[0];
  }

  saveEvent(event: Event): any {
    event.id = 999;
    event.sessions = [];
    this.events.push(event);
  }

  updateEvent(event: Event): any {
    const index = this.events.findIndex(x => x.id === event.id);
    this.events[index] = event;
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
      duration: 6576,
      name: 'fghg',
      level: '2',
      voters: undefined,
      presenter: 'ghhfgh'
    }
  ];

  return e;
}
