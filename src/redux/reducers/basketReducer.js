import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function basketReducer(state = initialState.basket, action) {
  switch (action.type) {
    case types.LOAD_BASKET_SUCCESS:
      return action.basket;

    case types.UPDATE_BASKET_SUCCESS:
      return action.basket;

    default:
      return state;
  }
}
