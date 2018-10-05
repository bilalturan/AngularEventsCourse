import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../models/event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  @Input() sessions: Session[];
  constructor() { }

  ngOnInit() {
  }

}
