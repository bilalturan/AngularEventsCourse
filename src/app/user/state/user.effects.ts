import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from './user.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class UserEffect {

  constructor(private actions$: Actions,
    private authService: AuthService) {
  }

  @Effect()
  loadProfiles$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.UpdateUsernameAction),
    mergeMap((action: userActions.UpdateUsername) => this.authService.updateCurrentUser(action.payload).pipe(
        map(() => (new userActions.UpdateUsernameSuccess(action.payload))),
        catchError((err: HttpErrorResponse) => {
          return of(new userActions.UpdateUsernameFail(err.message));
        })
      ))
  );

}
