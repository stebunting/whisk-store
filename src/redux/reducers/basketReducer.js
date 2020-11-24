import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function basketReducer(state = initialState.basket, action) {
  switch (action.type) {
    case types.LOAD_BASKET_SUCCESS:
    case types.UPDATE_BASKET_SUCCESS:
    case types.UPDATE_BASKET_ZONE_SUCCESS:
    case types.REMOVE_ITEM_FROM_BASKET_SUCCESS:
    case types.RESET_BASKET_SUCCESS:
      return action.basket;

    case types.APPEND_PRODUCTS_TO_BASKET:
      return {
        ...state,
        items: action.basketItems
      };

    default:
      return state;
  }
}
