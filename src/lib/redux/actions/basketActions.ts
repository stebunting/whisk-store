// Requirements
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Redux Actions
import types from './actionTypes';
import { ApiDispatch, beginApiCall } from './apiStatusActions';

// API Calls
import {
  getBasket,
  removeItemFromBasketApi,
  updateBasketApi,
  updateBasketZone,
  UpdateBasketPayload,
  resetBasket
} from '../../apiCalls';

// Types
import { Basket } from '../../../types/Basket';
import { AppState } from '../../../types/AppState';

export interface BasketAction extends Action<string> {
  payload: {
    basket: Basket
  }
}
type BasketDispatch = ThunkDispatch<AppState, null, BasketAction>

function loadBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.LOAD_BASKET_SUCCESS,
    payload: { basket }
  };
}

function updateBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.UPDATE_BASKET_SUCCESS,
    payload: { basket }
  };
}

function updateBasketZoneSuccess(basket: Basket): BasketAction {
  return {
    type: types.UPDATE_BASKET_ZONE_SUCCESS,
    payload: { basket }
  };
}

function removeItemFromBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.REMOVE_ITEM_FROM_BASKET_SUCCESS,
    payload: { basket }
  };
}

function resetBasketSuccess(basket: Basket): BasketAction {
  return {
    type: types.RESET_BASKET_SUCCESS,
    payload: { basket }
  };
}

// Load Basket Action Wrapper
export type LoadBasketAction = () => Promise<void>;
export function loadBasket() {
  return async (dispatch: BasketDispatch & ApiDispatch): Promise<void> => {
    dispatch(beginApiCall());
    const data = await getBasket();
    dispatch(loadBasketSuccess(data));
  };
}

// Update Basket Action Wrapper
export type UpdateBasketAction = (payload: UpdateBasketPayload) => Promise<void>;
export function updateBasket(payload: UpdateBasketPayload) {
  return async (dispatch: BasketDispatch & ApiDispatch): Promise<void> => {
    dispatch(beginApiCall());
    const data = await updateBasketApi(payload);
    dispatch(updateBasketSuccess(data));
  };
}

// Update Basket Zone Action Wrapper
export type UpdateBasketZoneAction = (address: string, zone: number) => Promise<void>;
export function updateBasketZoneApi(address: string, zone: number) {
  return async (dispatch: BasketDispatch & ApiDispatch): Promise<void> => {
    dispatch(beginApiCall());
    const data = await updateBasketZone(address, zone);
    dispatch(updateBasketZoneSuccess(data));
  };
}

// Remove Item From Basket Action Wrapper
export type RemoveItemFromBasketAction = (payload: UpdateBasketPayload) => Promise<void>;
export function removeItemFromBasket(payload: UpdateBasketPayload) {
  return async (dispatch: BasketDispatch & ApiDispatch): Promise<void> => {
    dispatch(beginApiCall());
    const data = await removeItemFromBasketApi(payload);
    dispatch(removeItemFromBasketSuccess(data));
  };
}

// Reset Basket Action Wrapper
export type ResetBasketAction = () => Promise<void>;
export function resetBasketApi() {
  return async (dispatch: BasketDispatch & ApiDispatch): Promise<void> => {
    dispatch(beginApiCall());
    const data = await resetBasket();
    dispatch(resetBasketSuccess(data));
  };
}
