import { Action } from '@ngrx/store';

export enum AppActionTypes {
  ToggleShowOnlineUrl = '[App] Toggle show online url',
  SomeOtherAction = '[App] Some other action'
}

export class ToggleShowOnlineUrl implements Action {
  readonly type = AppActionTypes.ToggleShowOnlineUrl;

  constructor(public payload: boolean) {}
}

export class SomeOtherAction implements Action {
  readonly type = AppActionTypes.SomeOtherAction;
}

export type AppActions = ToggleShowOnlineUrl | SomeOtherAction;
