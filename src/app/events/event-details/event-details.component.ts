import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { EventService } from '../../shared/event.service';
import { Event, Session } from '../models/event';

@Component({
  // selector: This componen is going to be routed to directly.
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  eventId = 67;
  addMode = false;
  constructor(private eventService: EventService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = +this.route.snapshot.params['id'];
    this.event = this.eventService.GetEvent(this.eventId);
  }

  addSession(): void {
    this.addMode = true;
  }

  saveNewSession(session: Session) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId;
    this.event.sessions.push(session);

    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancel() {
    this.addMode = false;
  }
}
