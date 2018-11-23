import { appReducer } from './app.reducer';
import { appInitialState } from './app.init';
import { App } from './app.interfaces';

import { AppAction, IncreaseCounter, DecreaseCounter, ResetCounter, INCREMENT, DECREMENT, RESET } from './app.actions';

describe('appReducer', () => {
  it('should work', () => {
    const state = appInitialState;
    const action = new ResetCounter();
    const actual = appReducer(state, action);
    expect(actual).toEqual(appInitialState);
  });
});
