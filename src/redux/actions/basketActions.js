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

export function resetBasket() {
  return function thunkResetBasket(dispatch) {
    return actions.resetBasket().then((data) => dispatch(resetBasketSuccess(data)));
  };
}
