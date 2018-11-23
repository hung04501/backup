import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State, Todo } from '../../+state/todo.interfaces';
import * as actions from '../../+state/todo.actions';
import * as fromTodo from '../../+state/todo.reducer';

import { SuggestionService } from '../../suggestion.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements AfterViewInit {
  todos: Observable<any>;

  @ViewChild('newTodo') newTodoTxt: ElementRef;

  constructor(private store: Store<State>, private suggestSvr: SuggestionService) {
    this.todos = this.store.select(fromTodo.selectAll);
  }

  ngAfterViewInit() {
    Observable.fromEvent(this.newTodoTxt.nativeElement, 'keypress')
      .filter((e: KeyboardEvent) => e.code === 'Enter')
      .map(_ => this.newTodoTxt.nativeElement.value)
      .filter(v => v !== '')
      .distinctUntilChanged()
      .subscribe(content => {
        this.newTodoTxt.nativeElement.value = '';
        this.createTodo(content);
      });
  }

  createTodo(content: string) {
    this.store.dispatch(
      new actions.Create({
        id: new Date().getTime().toString(),
        content,
        completed: false
      })
    );
  }

  toggleCompleteTodo(id: string, completed: boolean = true) {
    console.log(id, completed);
    this.updateTodo(id, { completed });
  }

  updateTodo(id, changes: any) {
    this.store.dispatch(new actions.Update(id, changes));
  }

  deleteTodo(id) {
    this.store.dispatch(new actions.Delete(id));
  }
}
