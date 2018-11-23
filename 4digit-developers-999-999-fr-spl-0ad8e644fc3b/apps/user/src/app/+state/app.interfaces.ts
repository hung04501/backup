export interface App {
  // define state here
  counter: number;
}

export interface AppState {
  readonly app: App;
}
