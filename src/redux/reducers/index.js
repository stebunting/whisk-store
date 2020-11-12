import { combineReducers } from 'redux';
import products from './productsReducer';
import basket from './basketReducer';

const rootReducer = combineReducers({
  products,
  basket
});

export default rootReducer;
