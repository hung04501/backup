import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { State } from './todo.interfaces';
import * as todoActions from './todo.actions';

@Injectable()
export class TodoEffects {
  @Effect()
  loadData = this.d.pessimisticUpdate(todoActions.LOAD, {
    run: (a: todoActions.LoadTodos, state: State) => new todoActions.TodosLoaded(),
    onError: (a: todoActions.LoadTodos, error) => console.error('Error', error)
  });

  constructor(private actions: Actions, private d: DataPersistence<State>) {}
}
