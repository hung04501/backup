import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { readAll, hot } from '@nrwl/nx/testing';
import { AuthEffects } from './auth.effects';
import { of } from 'rxjs/observable/of';

import * as Auth from './auth.actions';

describe('AuthEffects', () => {
  let actions;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AuthEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(AuthEffects);
  });

  describe('loginEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: new Auth.Login({ username: '4d', password: '4d' }) });
      expect(await readAll(effects.login)).toEqual([new Auth.LoginSuccess({ user: { name: '4d' } })]);
    });
  });
});
