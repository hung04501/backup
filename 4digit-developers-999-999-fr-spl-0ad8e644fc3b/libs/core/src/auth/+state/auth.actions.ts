import { Action } from '@ngrx/store';
import { User, Authenticate } from './auth.interfaces';

/*
There are many options in the way that we should implement Redux action:
  https://blog.angularindepth.com/how-to-reduce-action-boilerplate-90dc3d389e2b
  https://github.com/nrwl/nx/issues/78
  https://github.com/nrwl/nx/issues/76
  https://github.com/cartant/ts-action-operators
  https://github.com/cartant/ts-action
*/

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;

  constructor(public payload: { target: string; next: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions = Login | LoginRedirect | LoginSuccess | LoginFailure | Logout;

export default { Login, LoginRedirect, LoginSuccess, LoginFailure, Logout };
