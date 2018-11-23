import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './todo.interfaces';
import * as todoActions from './todo.actions';


@Injectable()
export class TodoEffects {
  // implement LoadTodos efect
  // Refer https://github.com/ngrx/platform/blob/master/docs/effects/README.md#example
  @Effect() loadTodo = this.actions.ofType(todoActions.LOAD).map((action: todoActions.LoadTodos) => {

    const newtodo = Object.keys(localStorage).map(key => {
      return JSON.parse(window.localStorage.getItem(key));
    })
    return new todoActions.Loaded(newtodo);
  });
  
  @Effect({ dispatch: false }) saveTodo = this.actions.ofType(todoActions.CREATE).do((action: todoActions.Create) => {
      console.log(action);
      window.localStorage.setItem(action.todo.id, JSON.stringify(action.todo));
  });

  @Effect({ dispatch: false }) deleteTodo = this.actions.ofType(todoActions.DELETE).do((action: todoActions.Delete) => {
      console.log(action);
      window.localStorage.removeItem(action.id);
  });

  // implement update effect
  @Effect({ dispatch: false }) updateTodo = this.actions.ofType(todoActions.UPDATE).do((action: todoActions.Update) => {
    const editTodo = JSON.parse(window.localStorage.getItem(action.id));
    editTodo.completed = action.changes.completed;
    window.localStorage.setItem(action.id, JSON.stringify(editTodo));
  });

  constructor(private actions: Actions) {}
}
