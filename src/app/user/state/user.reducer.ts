import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  username: string;
}

export interface State extends fromRoot.State {
  user: UserState;
}

const initialState: UserState = {
  username: null
};

const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getUsername = createSelector(
  getUserFeatureState,
  state => state.username
);

export function userReducer(state: UserState = initialState, action): UserState {

  switch (action.type) {

      case 'UPDATE_USERNAME':
      {
        return {
          ...state,
          username: action.payload
        };
      }

      default: {
        return state;
      }
  }

}



