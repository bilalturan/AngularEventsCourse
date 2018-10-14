import { Component, OnInit, Input } from '@angular/core';
import {Event} from '../models/event';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.scss']
})
export class EventThumbnailComponent implements OnInit {

  @Input() event: Event;
  constructor() { }

  ngOnInit() {
  }

  getStartTimeClass(): any {

    return {
      green: this.event && this.event.time === '10:00 am',
      bold: this.event && this.event.time === '10:00 am'
    };
  }
}
