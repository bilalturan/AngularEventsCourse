import { Injectable, Type } from '@angular/core';
import {Http} from '@angular/http';

import {Event, Location} from '../events/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: Http) { }

  getEvents(): Event[] {
    const e1 = createEvent();
    const e2 = createEvent();

    return [e1, e2];
  }

  GetEvent(id: number): Event {
    return createEvent();
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

  return e;
}