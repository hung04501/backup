import { Injectable } from '@angular/core';
import { Authenticate, User } from './+state/auth.interfaces';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class AuthService {
  constructor() {}

  login({ username, password }: Authenticate) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username === '4d' && password === '4d') {
      return Observable.of({ name: 'User' }).delay(2000);
    }
    return Observable.throw('Invalid username or password, the correct one is 4d:4d')
      .materialize()
      .delay(2000)
      .dematerialize();
  }

  logout() {
    return Observable.of(true).delay(2000);
  }
}
