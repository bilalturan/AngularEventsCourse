import { Component, OnInit, Input, Output } from '@angular/core';
import {Event} from '../models/event';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {

  @Input() event: Event;
  @Output() eventClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleClickMe(): void {
    this.eventClick.emit('Foo Button clicked');
  }

}
