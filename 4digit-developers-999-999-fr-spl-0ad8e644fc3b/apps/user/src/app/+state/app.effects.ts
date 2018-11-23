import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { AppState } from './app.interfaces';
import { IncreaseCounter, DecreaseCounter, ResetCounter, INCREMENT, DECREMENT, RESET } from './app.actions';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AppEffects {
  @Effect()
  someAction$ = this.actions.ofType(RESET).switchMap(() => {
    console.log('Effect: Counter has been reset');
    return empty();
  });

  constructor(private actions: Actions, private d: DataPersistence<AppState>) {}
}
