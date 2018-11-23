import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { State } from './routing.interfaces';

export const routingReducer: ActionReducerMap<State> = {
  state: routerReducer
};
