import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { EventService } from '../../shared/event.service';
import { Event } from '../models/event';

@Component({
  // selector: This componen is going to be routed to directly.
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  eventId = 67;
  constructor(private eventService: EventService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = +this.route.snapshot.params['id'];
    this.event = this.eventService.GetEvent(this.eventId);
  }

}
