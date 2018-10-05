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
  @Input() sortBy: string;
  filteredSessions: Session[];

  constructor() { }

  ngOnInit() {
  }

  // This is called each time the @Input varaibles gets a new value
  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortSessions(this.sortBy, this.filteredSessions);
    }
  }
  sortSessions(sortBy: string, filteredSessions: Session[]): any {
    if (sortBy === 'name') {
      this.filteredSessions.sort((s1: Session, s2: Session) => {
        if (s1.name > s2.name) {
          return 1;
        } else if (s1.name === s2.name) {
          return 0;
        } else {
          return -1;
        }
      });
    } else {
      this.filteredSessions.sort((s1: Session, s2: Session) => {
        return (s2.voters.length - s1.voters.length);
      });
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
