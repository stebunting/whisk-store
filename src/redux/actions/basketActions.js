import * as types from './actionTypes';
import * as actions from '../../functions/apiCalls';
import { beginApiCall } from './apiStatusActions';

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

export function updateBasketZoneSuccess(basket) {
  return {
    type: types.UPDATE_BASKET_ZONE_SUCCESS,
    basket
  };
}

export function removeItemFromBasketSuccess(basket) {
  return {
    type: types.REMOVE_ITEM_FROM_BASKET_SUCCESS,
    basket
  };
}

export function resetBasketSuccess(basket) {
  return {
    type: types.RESET_BASKET_SUCCESS,
    basket
  };
}

export function appendProductsToBasket(basketItems) {
  return {
    type: types.APPEND_PRODUCTS_TO_BASKET,
    basketItems
  };
}

export function loadBasket() {
  return function thunkLoadBasket(dispatch) {
    dispatch(beginApiCall());
    return actions.getBasket().then((data) => dispatch(loadBasketSuccess(data)));
  };
}

export function updateBasket(payload) {
  return function thunkUpdateBasket(dispatch) {
    dispatch(beginApiCall());
    return actions.updateBasketApi(payload).then((data) => (
      dispatch(updateBasketSuccess(data))
    ));
  };
}

export function updateBasketZoneApi(productId, zone) {
  return function thunkUpdateBasketZone(dispatch) {
    dispatch(beginApiCall());
    return actions.updateBasketZoneApi(productId, zone).then((data) => (
      dispatch(updateBasketZoneSuccess(data))
    ));
  };
}

export function removeItemFromBasket(productId) {
  return function thunkRemoveItemFromBasket(dispatch) {
    dispatch(beginApiCall());
    return actions.removeItemFromBasketApi(productId).then((data) => (
      dispatch(removeItemFromBasketSuccess(data))
    ));
  };
}

export function resetBasket() {
  return function thunkResetBasket(dispatch) {
    dispatch(beginApiCall());
    return actions.resetBasket().then((data) => dispatch(resetBasketSuccess(data)));
  };
}
