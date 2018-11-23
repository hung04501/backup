import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { Todo, State } from './todo.interfaces';
import * as actions from './todo.actions';

// Default data / initial state
const defaultState = {
  ids: [],
  entities: {}
};

export const todoAdapter = createEntityAdapter<Todo>();
export const initialState: State = todoAdapter.getInitialState(defaultState);

export function todoReducer(state: State = initialState, action: actions.TodoActions): State {
  switch (action.type) {
    case actions.CREATE:
      return todoAdapter.addOne(action.todo, state);

    case actions.UPDATE:
      return todoAdapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        state
      );

    case actions.DELETE:
      return todoAdapter.removeOne(action.id, state);

    default:
      return state;
  }
}

// Create the default selectors

export const getPizzaState = createFeatureSelector<State>('todo');

export const { selectIds, selectEntities, selectAll, selectTotal } = todoAdapter.getSelectors(getPizzaState);
