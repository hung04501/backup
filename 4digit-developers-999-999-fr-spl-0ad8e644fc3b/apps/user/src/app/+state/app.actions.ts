import { Action } from '@ngrx/store/src/models';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export class IncreaseCounter implements Action {
  readonly type = INCREMENT;
  payload: {};
}

export class DecreaseCounter implements Action {
  readonly type = DECREMENT;
  payload: {};
}

export class ResetCounter implements Action {
  readonly type = RESET;
  payload: {};
}

export type AppAction = IncreaseCounter | DecreaseCounter | ResetCounter;
