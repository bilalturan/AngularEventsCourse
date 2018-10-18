import { Action } from '@ngrx/store';

export enum UserActionTypes {
  UpdateUsernameAction = '[User] Update username action',
  SomeOtherUserAction = '[User] Some other user action'
}

export class UpdateUsername implements Action {
  readonly type = UserActionTypes.UpdateUsernameAction;

  constructor(public payload: string) {}
}

export class SomeOtherUserAction implements Action {
  readonly type = UserActionTypes.SomeOtherUserAction;
}

export type UserActions = UpdateUsername | SomeOtherUserAction;
