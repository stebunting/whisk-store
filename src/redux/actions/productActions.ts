// Requirements
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Redux Actions
import types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

// API Calls
import { getProducts } from '../../functions/apiCalls';

// Types
import { Product } from '../../types/Product';
import { ReduxState } from '../../types/ReduxState';

export interface ProductAction extends Action<string> {
  products: Array<Product>
}
type ProductThunk = ThunkAction<void, ReduxState, null, ProductAction>

// Action creator when products successfully loaded
function loadProductsSuccess(products: Array<Product>): ProductAction {
  return {
    type: types.LOAD_PRODUCTS_SUCCESS,
    products
  };
}

// Action wrapper to load products
export type LoadProductsAction = () => ProductThunk

export function loadProducts(): ProductThunk {
  return function thunkLoadProducts(dispatch: Dispatch): Promise<ProductAction> {
    dispatch(beginApiCall());
    return getProducts().then((data) => dispatch(loadProductsSuccess(data)));
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
