import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Session } from '../models/event';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter-service.service';

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
  @Input() eventId: number;
  filteredSessions: Session[];

  constructor(public authService: AuthService, private voterService: VoterService) { }

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

  toggleVote(session: Session) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.userName);
    } else {
    this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName);
    }

    if (this.sortBy === 'votes') {
      this.filteredSessions.sort((s1: Session, s2: Session) => {
        return (s2.voters.length - s1.voters.length);
      });
    }
  }

  userHasVoted(session: Session): boolean {
    return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
  }
}
