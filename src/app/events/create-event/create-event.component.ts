import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/event.service';
import {Event} from '../models/event';

@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  newEvent: Event;
  isDirt = true;
  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit() {

  }

  saveEvent(formValue) {
    this.eventService.saveEvent(formValue).subscribe( () => {
      this.isDirt = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
