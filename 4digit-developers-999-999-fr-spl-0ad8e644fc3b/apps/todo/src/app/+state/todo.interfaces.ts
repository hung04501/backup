import { EntityState } from '@ngrx/entity';

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type State = EntityState<Todo>;
