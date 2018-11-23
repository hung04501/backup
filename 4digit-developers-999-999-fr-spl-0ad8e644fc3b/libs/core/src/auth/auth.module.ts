import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './auth.service';
import { AuthGuard, LOGIN_REDIRECT_PATH } from './auth.guard';

import { reducer } from './+state/auth.reducer';
import { initialState } from './+state/auth.init';
import { AuthEffects } from './+state/auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('$auth', reducer, { initialState: initialState }),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
  static forRoot(loginRedirectPath: string): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard, AuthEffects, { provide: LOGIN_REDIRECT_PATH, useValue: loginRedirectPath }]
    };
  }
}
