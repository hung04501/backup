import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

/*
There are many options in the way that we should implement Redux action:
  https://blog.angularindepth.com/how-to-reduce-action-boilerplate-90dc3d389e2b
  https://github.com/nrwl/nx/issues/78
  https://github.com/nrwl/nx/issues/76
  https://github.com/cartant/ts-action-operators
  https://github.com/cartant/ts-action
*/

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward;
