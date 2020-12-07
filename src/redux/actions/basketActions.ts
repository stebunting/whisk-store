// Redux Actions
import types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

// API Calls
import * as actions from '../../functions/apiCalls';

function loadBasketSuccess(basket) {
  return {
    type: types.LOAD_BASKET_SUCCESS,
    basket
  };
}

function updateBasketSuccess(basket) {
  return {
    type: types.UPDATE_BASKET_SUCCESS,
    basket
  };
}

function updateBasketZoneSuccess(basket) {
  return {
    type: types.UPDATE_BASKET_ZONE_SUCCESS,
    basket
  };
}

function removeItemFromBasketSuccess(basket) {
  return {
    type: types.REMOVE_ITEM_FROM_BASKET_SUCCESS,
    basket
  };
}

function resetBasketSuccess(basket) {
  return {
    type: types.RESET_BASKET_SUCCESS,
    basket
  };
}

function appendProductsToBasket(basketItems) {
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

export interface UpdateBasketPayload {
  productSlug: string
  quantity: number,
  deliveryType: string,
  deliveryDate: string,
}

export function updateBasket(payload: UpdateBasketPayload) {
  return function thunkUpdateBasket(dispatch) {
    dispatch(beginApiCall());
    return actions.updateBasketApi(payload).then((data) => (
      dispatch(updateBasketSuccess(data))
    ));
  };
}

export function updateBasketZoneApi(basketId, zone) {
  return function thunkUpdateBasketZone(dispatch) {
    dispatch(beginApiCall());
    return actions.updateBasketZoneApi(basketId, zone).then((data) => (
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
