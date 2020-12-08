// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { Product } from '../../types/Product';
import { ProductAction } from '../actions/productActions';

function productsReducer(state = initialState.products, action: ProductAction): Array<Product> {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    default:
      return state;
  }
}

export default productsReducer;
