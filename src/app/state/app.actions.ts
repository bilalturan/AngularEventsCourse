import { Action } from '@ngrx/store';
import {Event} from '../events/models/event';

export enum AppActionTypes {
  ToggleShowOnlineUrl = '[App] Toggle show online url',
  Load = '[App] Load',
  LoadSuccess = '[App] Load Succees',
  LoadFail = '[App] Load Fail'
}

export class ToggleShowOnlineUrl implements Action {
  readonly type = AppActionTypes.ToggleShowOnlineUrl;

  constructor(public payload: boolean) {}
}

export class Load implements Action {
  readonly type = AppActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = AppActionTypes.LoadSuccess;

  constructor(public payload: Event[]) {}
}

export class LoadFail implements Action {
  readonly type = AppActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export type AppActions = ToggleShowOnlineUrl
| Load
| LoadSuccess
| LoadFail;
