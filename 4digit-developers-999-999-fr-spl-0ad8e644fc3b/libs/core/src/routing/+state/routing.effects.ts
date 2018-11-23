import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { State } from './routing.interfaces';
import * as Routing from './routing.actions';

@Injectable()
export class RoutingEffects {
  @Effect({ dispatch: false })
  navigate = this.actions
    .ofType(Routing.GO)
    .map((action: Routing.Go) => action.payload)
    .do(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  navigateBack = this.actions.ofType(Routing.BACK).do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward = this.actions.ofType(Routing.FORWARD).do(() => this.location.forward());

  constructor(private actions: Actions, private router: Router, private location: Location) {}
}
