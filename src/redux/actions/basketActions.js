import * as types from './actionTypes';
import { getBasket, updateBasketApi } from '../../functions/apiCalls';

export function loadBasketSuccess(basket) {
  return {
    type: types.LOAD_BASKET_SUCCESS,
    basket
  };
}

export function updateBasketSuccess(basket) {
  return {
    type: types.UPDATE_BASKET_SUCCESS,
    basket
  };
}

export function loadBasket() {
  return function thunkLoadBasket(dispatch) {
    return getBasket().then((data) => dispatch(loadBasketSuccess(data)));
  };
}

export function updateBasket(productId, quantity) {
  return function thunkUpdateBasket(dispatch) {
    return updateBasketApi(productId, quantity).then((data) => (
      dispatch(updateBasketSuccess(data))
    ));
  };
}
