// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { Basket, BasketItem } from '../../types/Basket';

interface BasketAction {
  type: string,
  basket?: Basket
  basketItems?: Array<BasketItem>
}

function basketReducer(state = initialState.basket, action: BasketAction) {
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

export default basketReducer;
