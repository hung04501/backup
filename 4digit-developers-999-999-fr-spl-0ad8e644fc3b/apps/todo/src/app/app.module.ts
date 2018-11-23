import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

// stuffs coming from libs
import { AuthModule } from '@fr-spl/core';
import { RoutingModule } from '@fr-spl/core';
import { CacheModule } from '@fr-spl/core';

// current module stuffs: modules, components, routing, services, interfaces, classes, guards, actions, reducers, effects, etc...
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule, loginRedirectPath } from './app-routing.module';
import { todoReducer } from './+state/todo.reducer';
import { TodoEffects } from './+state/todo.effects';
import { SuggestionService } from './suggestion.service';

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
    */
    StoreModule.forRoot({}, { metaReducers }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
    */
    EffectsModule.forRoot([]),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
    */
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 25 //  Retains last 25 states
        }),

    NxModule.forRoot(),
    AuthModule.forRoot(loginRedirectPath),
    RoutingModule.forRoot(),
    CacheModule.forRoot(),
    AppRoutingModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  providers: [TodoEffects, SuggestionService]
})
export class AppModule {}
