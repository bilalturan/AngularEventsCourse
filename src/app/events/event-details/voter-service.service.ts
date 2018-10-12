import { Injectable } from '@angular/core';
import { Session } from 'src/app/events/models/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  userHasVoted(session: Session, userName: string): boolean {
    return session.voters.some(voter => voter === userName);
  }

  addVoter(eventId: number, session: Session, voterName: string): void {
    session.voters.push(voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.post(url, {})
        .pipe(catchError(this.handleError<Session>('addVoter')))
        .subscribe();
  }

  deleteVoter(eventId: number, session: Session, voterName: string): void {
    session.voters = session.voters.filter(voter => voter !== voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url)
        .pipe(catchError(this.handleError<Session>('addVoter')))
        .subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
