import { Action } from '@ngrx/store';
import { User } from '../user.model';

export enum UserActionTypes {
  UpdateUsernameAction = '[User] Update username',
  SomeOtherUserAction = '[User] Some other user',
  UpdateUsernameSuccess = '[User] Update username success',
  UpdateUsernameFail = '[User] Update username fail',

}

export class UpdateUsername implements Action {
  readonly type = UserActionTypes.UpdateUsernameAction;

  constructor(public payload: User) {}
}

export class UpdateUsernameSuccess implements Action {
  readonly type = UserActionTypes.UpdateUsernameSuccess;

  constructor(public payload: User) {}
}

export class UpdateUsernameFail implements Action {
  readonly type = UserActionTypes.UpdateUsernameFail;

  constructor(public payload: string) {}
}

export class SomeOtherUserAction implements Action {
  readonly type = UserActionTypes.SomeOtherUserAction;
}

export type UserActions = UpdateUsername
| UpdateUsernameSuccess
| UpdateUsernameFail
| SomeOtherUserAction;
