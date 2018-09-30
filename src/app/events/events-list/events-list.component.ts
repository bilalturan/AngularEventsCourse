import { Component, OnInit } from '@angular/core';
import {Event, Location } from '../models/event';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  event: Event = new Event();
  constructor() {
    this.event.id = 1;
    this.event.name = 'Angular Connect';
    this.event.date = new Date(2036, 9, 9);
    this.event.time = '10:00 am';
    this.event.price = 599.99;
    this.event.imageUrl = '/assets/images/angularconnect-shield.png',
    this.event.location = new Location();
    this.event.location.address = '1057 DT';
    this.event.location.city = 'London';
    this.event.location.country = 'Engalnd';

   }

  ngOnInit() {
  }

}
