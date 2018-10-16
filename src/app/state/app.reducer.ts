import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export function reducer(state: AppState = initialState, action): AppState {

  switch (action.type) {

      case 'TOGGLE_SHOW_ONLINE_URL':
      {
        return {
          ...state,
          showOnlineUrl: action.payload
        };
      }

      default: {
        return state;
      }
  }

}


