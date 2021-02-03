// Requirements
import { combineReducers } from 'redux';

// Reducers
import products from './productsReducer';
import basket from './basketReducer';
import delivery from './deliveryReducer';
import user from './userReducer';
import checkoutForm from './checkoutFormReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  products,
  basket,
  delivery,
  user,
  validity: checkoutForm,
  apiCallsInProgress
});

export default rootReducer;
