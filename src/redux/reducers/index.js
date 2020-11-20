import { combineReducers } from 'redux';
import products from './productsReducer';
import basket from './basketReducer';
import user from './userReducer';
import checkoutForm from './checkoutFormReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  products,
  basket,
  user,
  validity: checkoutForm,
  apiCallsInProgress
});

export default rootReducer;
