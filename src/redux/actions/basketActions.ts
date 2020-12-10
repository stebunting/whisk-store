// Requirements
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Redux Actions
import types from './actionTypes';
import { ApiDispatch, beginApiCall } from './apiStatusActions';

// API Calls
import * as actions from '../../functions/apiCalls';

// Types
import { Basket } from '../../types/Basket';
import { ReduxState } from '../../types/ReduxState';

export interface BasketAction extends Action<string> {
  payload: {
    basket: Basket
  }
}
type BasketThunk = ThunkAction<void, ReduxState, null, BasketAction>
type BasketDispatch = ThunkDispatch<ReduxState, null, BasketAction>

export interface UpdateBasketPayload {
  productSlug: string
  quantity?: number,
  deliveryType: string,
  deliveryDate: string,
}

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
export type LoadBasketAction = () => BasketThunk;

export function loadBasket(): BasketThunk {
  return function thunkLoadBasket(
    dispatch: BasketDispatch & ApiDispatch
  ): Promise<BasketAction> {
    dispatch(beginApiCall());
    return actions.getBasket().then((data) => dispatch(loadBasketSuccess(data)));
  };
}

// Update Basket Action Wrapper
export type UpdateBasketAction = (payload: UpdateBasketPayload) => BasketThunk;

export function updateBasket(payload: UpdateBasketPayload): BasketThunk {
  return function thunkUpdateBasket(
    dispatch: BasketDispatch & ApiDispatch
  ): Promise<BasketAction> {
    dispatch(beginApiCall());
    return actions.updateBasketApi(payload).then((data) => (
      dispatch(updateBasketSuccess(data))
    ));
  };
}

// Update Basket Zone Action Wrapper
export type UpdateBasketZoneAction = (address: string, zone: number) => BasketThunk;

export function updateBasketZoneApi(address: string, zone: number): BasketThunk {
  return function thunkUpdateBasketZone(
    dispatch: BasketDispatch & ApiDispatch
  ): Promise<BasketAction> {
    dispatch(beginApiCall());
    return actions.updateBasketZoneApi(address, zone).then((data) => (
      dispatch(updateBasketZoneSuccess(data))
    ));
  };
}

// Remove Item From Basket Action Wrapper
export type RemoveItemFromBasketAction = (payload: UpdateBasketPayload) => BasketThunk;

export function removeItemFromBasket(payload: UpdateBasketPayload): BasketThunk {
  return function thunkRemoveItemFromBasket(
    dispatch: BasketDispatch & ApiDispatch
  ): Promise<BasketAction> {
    dispatch(beginApiCall());
    return actions.removeItemFromBasketApi(payload).then((data) => (
      dispatch(removeItemFromBasketSuccess(data))
    ));
  };
}

// Reset Basket Action Wrapper
export type ResetBasketAction = () => BasketThunk;

export function resetBasket(): BasketThunk {
  return function thunkResetBasket(
    dispatch: BasketDispatch & ApiDispatch
  ): Promise<BasketAction> {
    dispatch(beginApiCall());
    return actions.resetBasket().then((data) => dispatch(resetBasketSuccess(data)));
  };
}
