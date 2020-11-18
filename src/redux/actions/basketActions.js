import * as types from './actionTypes';
import * as actions from '../../functions/apiCalls';

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

export function loadBasket() {
  return function thunkLoadBasket(dispatch) {
    return actions.getBasket().then((data) => dispatch(loadBasketSuccess(data)));
  };
}

export function updateBasket(productId, quantity) {
  return function thunkUpdateBasket(dispatch) {
    return actions.updateBasketApi(productId, quantity).then((data) => (
      dispatch(updateBasketSuccess(data))
    ));
  };
}

export function updateBasketZoneApi(productId, zone) {
  return function thunkUpdateBasketZone(dispatch) {
    return actions.updateBasketZoneApi(productId, zone).then((data) => (
      dispatch(updateBasketZoneSuccess(data))
    ));
  };
}

export function removeItemFromBasket(productId) {
  return function thunkRemoveItemFromBasket(dispatch) {
    return actions.removeItemFromBasketApi(productId).then((data) => (
      dispatch(removeItemFromBasketSuccess(data))
    ));
  };
}

export function resetBasket() {
  return function thunkResetBasket(dispatch) {
    return actions.resetBasket().then((data) => dispatch(resetBasketSuccess(data)));
  };
}
