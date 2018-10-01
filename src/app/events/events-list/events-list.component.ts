import { Component, OnInit } from '@angular/core';
import {Event, Location } from '../models/event';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  myEvents: Event[] = [];
  constructor() {
    const e1 = createEvent();
    const e2 = createEvent();

    this.myEvents = [e1, e2];
   }

  ngOnInit() {
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

