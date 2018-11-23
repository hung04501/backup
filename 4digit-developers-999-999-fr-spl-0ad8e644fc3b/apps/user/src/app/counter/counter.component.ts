import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IncreaseCounter, DecreaseCounter, ResetCounter, INCREMENT, DECREMENT, RESET } from '../+state/app.actions';
import { AppState } from '../+state/app.interfaces';

@Component({
  selector: 'o-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  counter: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter = store.select('app').select('counter');
  }

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}
