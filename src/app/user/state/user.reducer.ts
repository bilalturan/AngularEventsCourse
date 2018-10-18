import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

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

export function userReducer(state: UserState = initialState, action: UserActions): UserState {

  switch (action.type) {

      case UserActionTypes.UpdateUsernameAction:
      {
        return {
          ...state,
          username: action.payload
        };
      }
      case UserActionTypes.SomeOtherUserAction:
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



