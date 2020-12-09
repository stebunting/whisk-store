// Redux Actions
import types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

// API Calls
import * as actions from '../../functions/apiCalls';

// Types
import { Basket } from '../../types/Basket';
import { Dispatch } from 'redux';

export interface BasketAction {
  type: string,
  basket: Basket
}

function loadBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.LOAD_BASKET_SUCCESS,
    basket
  };
}

function updateBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.UPDATE_BASKET_SUCCESS,
    basket
  };
}

function updateBasketZoneSuccess(basket: Basket): BasketAction {
  return {
    type: types.UPDATE_BASKET_ZONE_SUCCESS,
    basket
  };
}

function removeItemFromBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.REMOVE_ITEM_FROM_BASKET_SUCCESS,
    basket
  };
}

function resetBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.RESET_BASKET_SUCCESS,
    basket
  };
}

// Load Basket Action Wrapper
export type LoadBasketAction = () => void;

export function loadBasket() {
  return function thunkLoadBasket(dispatch: Dispatch) {
    dispatch(beginApiCall());
    return actions.getBasket().then((data) => dispatch(loadBasketSuccess(data)));
  };
}

export interface UpdateBasketPayload {
  productSlug: string
  quantity?: number,
  deliveryType: string,
  deliveryDate: string,
}

// Update Basket Action Wrapper
export type UpdateBasketAction = (payload: UpdateBasketPayload) => void;

export function updateBasket(payload: UpdateBasketPayload) {
  return function thunkUpdateBasket(dispatch: Dispatch) {
    dispatch(beginApiCall());
    return actions.updateBasketApi(payload).then((data) => (
      dispatch(updateBasketSuccess(data))
    ));
  };
}

export interface BasketLocation {
  zone: number,
  address: string
}

// Update Basket Zone Action Wrapper
export type UpdateBasketZoneAction = (location: BasketLocation) => void;

export function updateBasketZoneApi(location: BasketLocation) {
  return function thunkUpdateBasketZone(dispatch: Dispatch) {
    dispatch(beginApiCall());
    return actions.updateBasketZoneApi(location).then((data) => (
      dispatch(updateBasketZoneSuccess(data))
    ));
  };
}

// Remove Item From Basket Action Wrapper
export type RemoveItemFromBasketAction = (payload: UpdateBasketPayload) => void;

export function removeItemFromBasket(payload: UpdateBasketPayload) {
  return function thunkRemoveItemFromBasket(dispatch: Dispatch) {
    dispatch(beginApiCall());
    return actions.removeItemFromBasketApi(payload).then((data) => (
      dispatch(removeItemFromBasketSuccess(data))
    ));
  };
}

// Reset Basket Action Wrapper
export type ResetBasketAction = () => void;

export function resetBasket() {
  return function thunkResetBasket(dispatch: Dispatch) {
    dispatch(beginApiCall());
    return actions.resetBasket().then((data) => dispatch(resetBasketSuccess(data)));
  };
}
