import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.actions';


export interface AppState {
  showOnlineUrl: boolean;
}

const initialState: AppState = {
  showOnlineUrl: true
};

const getAppFeatureState = createFeatureSelector<AppState>('app');
export const getShowOnlineUrl = createSelector(
  getAppFeatureState,
  state => state.showOnlineUrl
);

export function reducer(state: AppState = initialState, action: AppActions): AppState {

  switch (action.type) {

      case AppActionTypes.ToggleShowOnlineUrl:
      {
        return {
          ...state,
          showOnlineUrl: action.payload
        };
      }
      case AppActionTypes.SomeOtherAction:
      {
        return {
          ...state
        };
      }
      default: {
        return state;
      }
  }

}


