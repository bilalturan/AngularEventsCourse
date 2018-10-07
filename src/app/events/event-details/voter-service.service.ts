import { Injectable } from '@angular/core';
import { Session } from 'src/app/events/models/event';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  userHasVoted(session: Session, userName: string): boolean {
    return session.voters.some(voter => voter === userName);
  }
  addVoter(session: Session, userName: string): void {
    session.voters.push(userName);
  }
  deleteVoter(session: Session, userName: string): void {
    session.voters = session.voters.filter(voter => voter !== userName);
  }

  constructor() { }
}
