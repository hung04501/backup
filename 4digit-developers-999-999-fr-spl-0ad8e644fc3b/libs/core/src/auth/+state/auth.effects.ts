import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { DataPersistence } from '@nrwl/nx';

import { AuthService } from '../auth.service';
import { AuthState } from './auth.interfaces';
import * as Auth from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  loginRedirect = this.actions
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .map((action: Auth.LoginRedirect) => action.payload)
    .do(payload => {
      this.router.navigate([payload.target], { queryParams: { returnUrl: payload.next } });
    });

  @Effect()
  login = this.actions
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map(user => {
          return new Auth.LoginSuccess({ user });
        })
        .catch(error => Observable.of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess = this.actions.ofType(Auth.LOGIN_SUCCESS).do(() => {
    let returnUrl = this.route.snapshot.queryParams.returnUrl;
    returnUrl = returnUrl ? returnUrl : '/';
    this.router.navigate([returnUrl]);
  });

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
