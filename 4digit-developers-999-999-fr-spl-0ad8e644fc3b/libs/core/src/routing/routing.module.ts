import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { CustomRouterStateSerializer } from './+state/routing.interfaces';
import { routingReducer } from './+state/routing.reducer';
import { RoutingEffects } from './+state/routing.effects';

@NgModule({
  imports: [
    StoreRouterConnectingModule,
    StoreModule.forFeature('$router', routingReducer),
    EffectsModule.forFeature([RoutingEffects])
  ]
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RoutingModule,
      providers: [
        /**
         * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
         * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
         * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
        */
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        RoutingEffects
      ]
    };
  }
}
