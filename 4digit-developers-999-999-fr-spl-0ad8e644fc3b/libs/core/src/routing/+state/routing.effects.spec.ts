import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { readAll, hot } from '@nrwl/nx/testing';
import { RoutingEffects } from './routing.effects';
import { of } from 'rxjs/observable/of';

import * as Routing from './routing.actions';

describe('RoutingEffects', () => {
  let actions;
  let effects: RoutingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [RoutingEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(RoutingEffects);
  });

  describe('GoEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: new Routing.Go({ path: ['/'] }) });
      expect(await readAll(effects.navigate)).toEqual([{ path: ['/'] }]);
    });
  });
});
