import { combineReducers } from 'redux';
import products from './productsReducer';
import basket from './basketReducer';
import user from './userReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  products,
  basket,
  user,
  apiCallsInProgress
});

export default rootReducer;
