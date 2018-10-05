import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Session } from '../models/event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit, OnChanges {

  @Input() sessions: Session[];
  @Input() filterBy: string;
  filteredSessions: Session[];

  constructor() { }

  ngOnInit() {
  }

  // This is called each time the @Input varaibles gets a new value
  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
    }
  }

  filterSessions(filter) {

    if (filter === 'all') {
      this.filteredSessions =  this.sessions.slice(0); // clone
    } else {
      this.filteredSessions = this.sessions.filter(session => {
         return session.level.toLocaleLowerCase() === filter.toLocaleLowerCase();
      });
    }
  }
}
