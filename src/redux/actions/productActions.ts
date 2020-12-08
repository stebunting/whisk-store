// Redux Actions
import types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

// API Calls
import { getProducts } from '../../functions/apiCalls';
import { Dispatch } from 'redux';

// Types
import { Product } from '../../types/Product';

export interface ProductAction {
  type: string,
  products: Array<Product>
}

function loadProductsSuccess(products: Array<Product>): ProductAction {
  return {
    type: types.LOAD_PRODUCTS_SUCCESS,
    products
  };
}

export function loadProducts() {
  return function thunkLoadProducts(dispatch: Dispatch) {
    dispatch(beginApiCall());
    return getProducts().then((data) => dispatch(loadProductsSuccess(data)));
  };
}
