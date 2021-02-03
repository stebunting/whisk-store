// Requirements
import { Action, Dispatch } from 'redux';

// Redux Actions
import types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

// API Calls
import { getProducts } from '../../apiCalls';

// Types
import { Product } from '../../../types/Product';

export interface ProductAction extends Action<string> {
  products: Array<Product>
}

// Action creator when products successfully loaded
function loadProductsSuccess(products: Array<Product>): ProductAction {
  return {
    type: types.LOAD_PRODUCTS_SUCCESS,
    products
  };
}

// Action wrapper to load products
export type LoadProductsAction = () => Promise<void>
export function loadProducts() {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(beginApiCall());
    const data = await getProducts();
    dispatch(loadProductsSuccess(data));
  };
}

// Add products to the product store
export type AddProductsToStoreAction = (products: Array<Product>) => ProductAction;
export function addProductsToStore(products: Array<Product>): ProductAction {
  return {
    type: types.ADD_PRODUCT_TO_STORE,
    products
  };
}
