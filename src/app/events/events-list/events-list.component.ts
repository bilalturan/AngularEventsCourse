import { Component, OnInit } from '@angular/core';

import {Event } from '../models/event';
import { EventService } from '../../shared/event.service';
import { ToastrService } from '../../common/toastr.service';

@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  myEvents: Event[] = [];
  constructor(private eventService: EventService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.myEvents = data;
    });
  }

  handleThumbnailClick(eventName: string): void {
    this.toastr.success(eventName);
  }
}

