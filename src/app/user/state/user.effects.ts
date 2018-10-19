import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from './user.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Action } from '@ngrx/store';
import { User } from '../user.model';

@Injectable()
export class UserEffect {

  constructor(private actions$: Actions,
    private authService: AuthService) {
  }

  @Effect()
  loadProfiles$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.UpdateUsernameAction),
    map((action: userActions.UpdateUsername) => action.payload),
    mergeMap((user: User) => this.authService.updateCurrentUser(user).pipe(
        map(() => (new userActions.UpdateUsernameSuccess(user))),
        catchError((err: HttpErrorResponse) => {
          return of(new userActions.UpdateUsernameFail(err.message));
        })
      ))
  );

}
