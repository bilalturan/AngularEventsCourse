import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';
import { User } from '../user.model';

export interface UserState {
  user: User;
  error: string;
}

export interface State extends fromRoot.State {
  user: UserState;
}

const initialState: UserState = {
  user: new User(),
  error: ''
};

const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getUsername = createSelector(
  getUserFeatureState,
  state => state.user
);

export function userReducer(state: UserState = initialState, action: UserActions): UserState {

  switch (action.type) {

      case UserActionTypes.UpdateUsernameAction:
      {
        return {
          ...state,
          user: action.payload
        };
      }
      case UserActionTypes.UpdateUsernameSuccess:
      {
        return {
          ...state,
          user: action.payload,
          error: ''
        };
      }
      case UserActionTypes.UpdateUsernameFail:
      {
        return {
          ...state,
          user: null,
          error: action.payload
        };
      }
      default: {
        return state;
      }
  }

}



