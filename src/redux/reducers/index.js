import { combineReducers } from 'redux';
import products from './productsReducer';
import basket from './basketReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  products,
  basket,
  user
});

export default rootReducer;
