// /events/1

import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/event.service';
import {Event} from '../models/event';

@Component({
  // selector: 'app-event-details'
  // Selector not  used.
  // This componen is going to be routed to directly.
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.event = this.eventService.GetEvent(1);
  }

}
