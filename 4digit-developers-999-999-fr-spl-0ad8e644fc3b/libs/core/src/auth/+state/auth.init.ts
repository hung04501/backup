import { AuthState } from './auth.interfaces';

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  error: null,
  pending: false
};
