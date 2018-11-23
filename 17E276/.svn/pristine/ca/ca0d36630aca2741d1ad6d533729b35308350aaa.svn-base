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
  //todos: Observable<Todo[]>;
  todos: any;
  // declare varibale to store counter
  counter = 0;
  listTodo: Todo[];
  objTemp: any;


  @ViewChild('newTodo') newTodoTxt: ElementRef;

  constructor(private store: Store<State>) {
    this.todos = new Array();
    this.store.dispatch(new todoActions.LoadTodos());
    this.store.select(todoSelectors.selectAll).subscribe(datas => this.todos = datas);
    this.todos = JSON.parse(window.localStorage.getItem("listTodo"));
    // get counter value from store by selecting it
    this.store.select(getCounterValue).subscribe(data => this.counter = data);
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
    this.objTemp = {
      id: new Date().getTime().toString(),
      content,
      completed: false
    }
    this.store.dispatch(new todoActions.Create(this.objTemp));
    this.todos = JSON.parse(window.localStorage.getItem("listTodo"));
  }

  toggleCompleteTodo(id: string, completed: boolean = true) {
    this.updateTodo(id, { completed });
    this.todos = JSON.parse(window.localStorage.getItem("listTodo"));
  }

  updateTodo(id, changes: any) {
    this.store.dispatch(new todoActions.Update(id, changes));
  }

  deleteTodo(id) {
    this.store.dispatch(new todoActions.Delete(id));
    this.todos = JSON.parse(window.localStorage.getItem("listTodo"));
  }

  handleCounter(action: any) {
    switch (action) {
      case 1: {
        this.store.dispatch(new counterActions.Increase);
        break;
      }
      case 2: {
        this.store.dispatch(new counterActions.Decrease);
        break;
      }
      case 3: {
        this.store.dispatch(new counterActions.Reset);
        break;
      }
      default: {
        break;
      }
    }
  }
}
