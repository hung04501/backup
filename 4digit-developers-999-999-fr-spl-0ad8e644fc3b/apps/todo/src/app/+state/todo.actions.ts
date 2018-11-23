import { Action } from '@ngrx/store';
import { Todo } from './todo.interfaces';

export const LOAD = '[Todos] Load';
export const LOADED = '[Todos] Loaded';
export const LOAD_FAILED = '[Todos] Load Failed';

export const CREATE = '[Todos] Create';
export const CREATED = '[Todos] Created';
export const CREATE_FAILED = '[Todos] Create Failed';

export const UPDATE = '[Todos] Update';
export const UPDATED = '[Todos] Updated';
export const UPDATE_FAILED = '[Todos] Update Failed';

export const DELETE = '[Todos] Delete';
export const DELETED = '[Todos] Deleted';
export const DELETE_FAILED = '[Todos] Delete Failed';

export class LoadTodos {
  readonly type = LOAD;
}

export class TodosLoaded {
  readonly type = LOADED;
}

export class TodosLoadFailed {
  readonly type = LOAD_FAILED;
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public todo: Todo) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<Todo>) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}

export type TodoActions = LoadTodos | TodosLoaded | Create | Update | Delete;
