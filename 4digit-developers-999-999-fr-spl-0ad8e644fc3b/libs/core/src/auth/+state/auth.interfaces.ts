export interface User {
  name: string;
}

export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
  error: string | null;
  pending: boolean;
}

export interface State {
  readonly auth: AuthState;
}
