import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Todo, State } from './todo.interfaces';
import * as actions from './todo.actions';

// Default data / initial state
const defaultState = {
  ids: [],
  entities: {}
};

const todoAdapter = createEntityAdapter<Todo>();
const initialState: State = todoAdapter.getInitialState(defaultState);

export function reducer(state: State = initialState, action: actions.TodoActions): State {
  switch (action.type) {

    case actions.LOADED:
    // implement action loaded
    // hint todoAdapter.addAll
      return todoAdapter.addAll(action.todos, state);

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

export const getState = (selector: string) => createFeatureSelector<State>(selector);
export const getSelectors = (selector: MemoizedSelector<object, State>) => todoAdapter.getSelectors(selector);



