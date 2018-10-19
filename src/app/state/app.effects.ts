import { Injectable } from '@angular/core';
import { EventService } from '../shared/event.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from '../state/app.actions';
import {Event} from '../events/models/event';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

@Injectable()
export class EventsEffect {

  constructor(private actions$: Actions,
    private eventService: EventService) {
  }

  @Effect()
  loadEvents$: Observable<Action> = this.actions$.pipe(
    tap(action => console.log('Action type: ' + action.type)),
    ofType(appActions.AppActionTypes.Load),
    tap(a => console.log('Handles Action type: ' + a.type)),
    mergeMap((action: appActions.Load) => this.eventService.getEvents().pipe(
        map((events: Event[]) => (new appActions.LoadSuccess(events))),
        catchError((err: HttpErrorResponse) => {
          return of(new appActions.LoadFail(err.message));
        })
      ))
  );
}


// RxJs operators:
    // switchMap: Cancels current subscription/request and can cause race conditions.
    //            Used for get requests or cancelable requests like searched
    // concatMap: Runs subscriptions/ request in order and i less performant.
    //            Used for get, post and put when order is important.
    // mergeMap:  Runs subscriptions/requests in parallel. Performant.
    //            Used for put, post and delete when order is NOT important.
    // exhaustMap:Ignores all subsequest subscriptions/requests until it completes.
    //            Used for login when you do not want more requests until the initial one is complete.}
