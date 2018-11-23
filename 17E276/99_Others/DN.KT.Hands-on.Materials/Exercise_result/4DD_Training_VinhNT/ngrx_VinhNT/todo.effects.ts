import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './todo.interfaces';
import * as todoActions from './todo.actions';


@Injectable()
export class TodoEffects {
  listTodo = new Array();
  // implement LoadTodos efect
  @Effect({ dispatch: false }) loaded = this.actions.ofType(todoActions.LOADED).map((action: todoActions.Loaded) => {
    console.log(action);
    //JSON.parse(window.localStorage.getItem("listTodo"));
  });

  // Refer https://github.com/ngrx/platform/blob/master/docs/effects/README.md#example
  @Effect({ dispatch: false }) loadTodo = this.actions.ofType(todoActions.LOAD).map((action: todoActions.LoadTodos) => {
    console.log(action);
  });


  //Create
  @Effect({ dispatch: false }) saveTodo = this.actions.ofType(todoActions.CREATE).do((action: todoActions.Create) => {
    console.log(action);
    if (this.listTodo.length < 1 && JSON.parse(window.localStorage.getItem("listTodo")).length > 0) {
      var listTemp = JSON.parse(window.localStorage.getItem("listTodo"));
      for (var i = 0; i < listTemp.length; i++) {
        this.listTodo.push(listTemp[i]);
      }
    }
    this.listTodo.push(action.todo);
    window.localStorage.setItem("listTodo", JSON.stringify(this.listTodo));
  });

  //Delete
  @Effect({ dispatch: false }) deleteTodo = this.actions.ofType(todoActions.DELETE).do((action: todoActions.Delete) => {
    console.log(action);
    var list = JSON.parse(window.localStorage.getItem("listTodo"));
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].id == action.id) {
        list.splice(i, 1);
      }
    }
    window.localStorage.setItem("listTodo", JSON.stringify(list));
  });

  // implement update effect
  @Effect({ dispatch: false }) updateTodo = this.actions.ofType(todoActions.UPDATE).do((action: todoActions.Update) => {
    console.log(action);
    var list = JSON.parse(window.localStorage.getItem("listTodo"));
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].id == action.id) {
        list[i].completed = action.changes.completed;

      }
    }
    window.localStorage.setItem("listTodo", JSON.stringify(list));
  });

  constructor(private actions: Actions) { }
}
