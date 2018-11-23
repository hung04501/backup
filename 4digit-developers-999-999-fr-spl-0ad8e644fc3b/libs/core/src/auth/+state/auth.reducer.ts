import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth.interfaces';
import { initialState } from './auth.init';
import * as Auth from './auth.actions';

export function reducer(state = initialState, action: Auth.Actions): AuthState {
  switch (action.type) {
    case Auth.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }

    case Auth.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true,
        error: null,
        pending: false
      };
    }

    case Auth.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    }

    case Auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const selectAuthState = createFeatureSelector<AuthState>('$auth');

export const getLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.loggedIn);
export const getUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const getError = createSelector(selectAuthState, (state: AuthState) => state.error);
export const getPending = createSelector(selectAuthState, (state: AuthState) => state.pending);

export default { getLoggedIn, getUser, getError, getPending };
