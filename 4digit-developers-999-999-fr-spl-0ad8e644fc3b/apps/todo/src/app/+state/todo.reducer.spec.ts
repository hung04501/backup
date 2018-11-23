import { todoReducer } from './todo.reducer';
import { Todo, State } from './todo.interfaces';

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import * as actions from './todo.actions';

// Default data / initial state
const defaultState = {
  ids: [],
  entities: {}
};
export const todoAdapter = createEntityAdapter<Todo>();

describe('todoReducer', () => {
  it('should work', () => {
    const state = todoAdapter.getInitialState(defaultState);
    const action = new actions.Create({
      id: new Date().getTime().toString(),
      content: 'test Todo',
      completed: false
    });
    const actual = todoReducer(state, action);

    const expected = todoAdapter.addOne(action.todo, todoAdapter.getInitialState(defaultState));

    expect(actual).toEqual(expected);
  });
});
