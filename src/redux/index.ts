// Requirements
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Config
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function configureStore(initialState = {}) {
  let enhancer = applyMiddleware(thunk);
  if (process.env.NODE_ENV === 'development') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(enhancer);
  }
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
