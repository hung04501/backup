import { reducer } from './auth.reducer';
import { initialState } from './auth.init';
import * as Actions from './auth.actions';

describe('authReducer', () => {
  it('should work', () => {
    const state = initialState;
    const action = new Actions.Logout();
    const actual = reducer(state, action);
    expect(actual).toEqual(initialState);
  });
});
