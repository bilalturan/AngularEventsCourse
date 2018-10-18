import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.actions';
import {Event} from '../events/models/event';


export interface AppState {
  showOnlineUrl: boolean;
  events: Event[];
  error: string;
}

const initialState: AppState = {
  showOnlineUrl: true,
  events: [],
  error: ''
};

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getShowOnlineUrl = createSelector(
  getAppFeatureState,
  state => state.showOnlineUrl
);

export const getEvents = createSelector(
  getAppFeatureState,
  state => state.events
);

export const getError = createSelector(
  getAppFeatureState,
  state => state.error
);

export function reducer(state = initialState, action: AppActions): AppState {

  switch (action.type) {

      case AppActionTypes.ToggleShowOnlineUrl:
      {
        return {
          ...state,
          showOnlineUrl: action.payload
        };
      }
      case AppActionTypes.Load:
      {
        return {
          ...state,
        };
      }
      case AppActionTypes.LoadSuccess:
      {
        return {
          ...state,
          events: action.payload,
          error: ''
        };
      }
      case AppActionTypes.LoadFail:
      {
        return {
          ...state,
          events: [],
          error: action.payload
        };
      }
      default: {
        return state;
      }
  }

}


