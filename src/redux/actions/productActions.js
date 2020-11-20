import * as types from './actionTypes';
import { getProducts } from '../../functions/apiCalls';
import { beginApiCall } from './apiStatusActions';

export function loadProductsSuccess(products) {
  return {
    type: types.LOAD_PRODUCTS_SUCCESS,
    products
  };
}

export function loadProducts() {
  return function thunkLoadProducts(dispatch) {
    dispatch(beginApiCall());
    return getProducts().then((data) => dispatch(loadProductsSuccess(data)));
  };
}
