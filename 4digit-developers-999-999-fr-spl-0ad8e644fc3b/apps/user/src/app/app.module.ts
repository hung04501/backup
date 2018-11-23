import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { NxModule } from '@nrwl/nx';
import { SplComponentsModule } from '../../../../libs/spl-components/spl-components.module';

import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CounterComponent } from './counter/counter.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { routerReducer } from '@ngrx/router-store';

// Import effects
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';

import { CacheModule, FormCacheDirective } from '@fr-spl/core';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    SplComponentsModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    EffectsModule.forRoot([AppEffects]),
    CacheModule.forRoot() // <- FormCacheDirective depends on CacheService provided by CacheModule
  ],
  declarations: [AppComponent, Comp1Component, Comp2Component, HomePageComponent, CounterComponent, FormCacheDirective],
  bootstrap: [AppComponent],
  providers: [AppEffects]
})
export class AppModule {}
