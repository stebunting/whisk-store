// Requirements
import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  Action
} from 'redux';
import thunk from 'redux-thunk';
import { AppState } from '../../types/AppState';

// Config
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function configureStore(initialState = {}): Store<AppState, Action> {
  let enhancer = applyMiddleware(thunk);
  if (process.env.NODE_ENV === 'development') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(enhancer);
  }

  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
