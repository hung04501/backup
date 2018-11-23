import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';


import { State, Todo } from './+state/todo.interfaces';
import * as todoActions from './+state/todo.actions';
import { todoSelectors, getCounterValue } from './+state';

import * as counterActions from './+state/counter.actions';


import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Observable<Todo[]>;
  currentValue$: Observable<number>;
  // declare varibale to store counter

  @ViewChild('newTodo') newTodoTxt: ElementRef;

  constructor(private store: Store<State>) {
    this.store.dispatch(new todoActions.LoadTodos());
    this.todos = this.store.select(todoSelectors.selectAll);
    this.currentValue$ = this.store.select(getCounterValue);
  }

  ngAfterViewInit() {
    Observable.fromEvent(this.newTodoTxt.nativeElement, 'keypress')
      // .do(console.log)
      .filter((e: KeyboardEvent) => e.code === 'Enter')
      .map(_ => this.newTodoTxt.nativeElement.value)
      .filter(v => v !== '')
      .subscribe(content => {
        this.newTodoTxt.nativeElement.value = '';
        this.createTodo(content);
      });
  }

  createTodo(content: string) {
    this.store.dispatch(
      new todoActions.Create({
        id: new Date().getTime().toString(),
        content,
        completed: false
      })
    );
  }

  toggleCompleteTodo(id: string, completed: boolean = true) {
    this.updateTodo(id, { completed });
  }

  updateTodo(id, changes: any) {
    this.store.dispatch(new todoActions.Update(id, changes));
  }

  deleteTodo(id) {
    this.store.dispatch(new todoActions.Delete(id));
  }

  increment() {
    this.store.dispatch(
      new counterActions.Increase()
    );
  }
  decrement() {
    this.store.dispatch(
      new counterActions.Decrease()
    );
  }
  reset() {
    this.store.dispatch(
      new counterActions.Reset()
    );
  }

}
