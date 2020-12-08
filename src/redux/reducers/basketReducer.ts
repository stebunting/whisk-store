// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { BasketAction } from '../actions/basketActions';
import { Basket } from '../../types/Basket';

function basketReducer(state = initialState.basket, action: BasketAction): Basket {
  switch (action.type) {
    case types.LOAD_BASKET_SUCCESS:
    case types.UPDATE_BASKET_SUCCESS:
    case types.UPDATE_BASKET_ZONE_SUCCESS:
    case types.REMOVE_ITEM_FROM_BASKET_SUCCESS:
    case types.RESET_BASKET_SUCCESS:
      return action.basket;

    default:
      return state;
  }
}

export default basketReducer;
