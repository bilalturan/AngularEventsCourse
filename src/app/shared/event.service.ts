import { Injectable, EventEmitter } from '@angular/core';
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

  searchSessions(searchTerm: string): any {
    const term = searchTerm.toLocaleLowerCase();

    console.log('term: ' + term);
    let result: Session[] = [];

    this.events.forEach(event => {
      let matchingSessions = event.sessions.filter(session => {
          return session.name.toLocaleLowerCase().indexOf(term) > -1;
      });

      matchingSessions = matchingSessions.map((session: any) => {
        session.eventId = event.id;
        return session;
      });

      result = result.concat(matchingSessions);
    });

    console.log('result: ' + result);

    const emitter = new EventEmitter(true);
    setTimeout(() => {
      emitter.emit(result);
    }, 100);

    return emitter;
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
