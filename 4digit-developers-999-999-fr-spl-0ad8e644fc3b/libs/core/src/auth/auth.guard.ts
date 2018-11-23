import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthState } from './+state/auth.interfaces';
import * as Auth from './+state/auth.actions';
import * as fromAuth from './+state/auth.reducer';

export const LOGIN_REDIRECT_PATH = new InjectionToken<string>('LOGIN_REDIRECT_PATH');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, @Inject(LOGIN_REDIRECT_PATH) private loginRedirectPath: string) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .select(fromAuth.getLoggedIn)
      .map(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(new Auth.LoginRedirect({ target: this.loginRedirectPath, next: state.url }));
          return false;
        }

        return true;
      })
      .take(1);
  }
}
