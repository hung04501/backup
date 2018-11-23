import "babel-polyfill"

import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactRedux } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import * as actions from './actions';
import App from './components/App';
import { rootEpic } from './epics';
import { rootReducer }  from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});


const epicMiddleware = createEpicMiddleware(rootEpic);

/**
 * The redux state store, built with the Epic middleware.
 */
const store = createStore(
  rootReducer,
  composeEnhancers(
  applyMiddleware(epicMiddleware))
);

store.dispatch(actions.getAllProducts());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
