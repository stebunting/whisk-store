// Config
import types from '../actions/actionTypes';
import initialState from '../initialState';

// Redux Actions
import { ProductAction } from '../actions/productActions';

// Types
import { Product } from '../../../types/Product';

function productsReducer(
  state = initialState.products, action: ProductAction
): Array<Product> {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    case types.ADD_PRODUCT_TO_STORE:
      return [
        ...state,
        ...action.products
      ];

    default:
      return state;
  }
}

export default productsReducer;
