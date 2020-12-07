// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { Product } from '../../types/Product';

interface ProductAction {
  type: string,
  products: Array<Product>
}

function productsReducer(state = initialState.products, action: ProductAction) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    default:
      return state;
  }
}

export default productsReducer;
