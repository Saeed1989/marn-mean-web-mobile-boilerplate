import { User } from '../../core/modles/user.model';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
  error: string;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
  error: '',
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state?.currentUser || null
);

export const getUserError = createSelector(
  getUserFeatureState,
  (state) => state.error
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  }),
  on(UserActions.setCurrentUser, (state, action): UserState => {
    return {
      ...state,
      currentUser: action.currentUser,
    };
  }),
  on(UserActions.setUserError, (state, action): UserState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
