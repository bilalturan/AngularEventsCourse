import { Component, OnInit } from '@angular/core';

import {Event } from '../models/event';
import { EventService } from '../../shared/event.service';
import { ToastrService } from '../../common/toastr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  myEvents: Event[] = [];
  constructor(private eventService: EventService,
    private toastr: ToastrService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.eventService.getEvents().subscribe(data => {
    //   this.myEvents = data;
    // });

    this.myEvents = this.route.snapshot.data['events'];
  }

  handleThumbnailClick(eventName: string): void {
    this.toastr.success(eventName);
  }
}

