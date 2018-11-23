import { App } from './app.interfaces';
import { AppAction, IncreaseCounter, DecreaseCounter, ResetCounter, INCREMENT, DECREMENT, RESET } from './app.actions';
import { appInitialState } from './app.init';

export function appReducer(state: App = appInitialState, action: AppAction): App {
  switch (action.type) {
    case INCREMENT: {
      console.log('Reducer: increased');
      const newCounter = state.counter + 1;
      return { ...{ counter: newCounter }, ...action.payload };
    }
    case DECREMENT: {
      console.log('Reducer: decreased');
      const newCounter = state.counter - 1;
      return { ...{ counter: newCounter }, ...action.payload };
    }
    case RESET: {
      console.log('Reducer: reset');
      return appInitialState;
    }
    default: {
      return state;
    }
  }
}
