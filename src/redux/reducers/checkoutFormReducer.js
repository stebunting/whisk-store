import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkoutFormReducer(state = initialState.validity, action) {
  switch (action.type) {
    case types.UPDATE_VALIDITY:
      if (Object.prototype.hasOwnProperty.call(state, action.payload.name)) {
        return {
          ...state,
          [action.payload.name]: action.payload.value
        };
      }
      return state;

    case types.UPDATE_VALIDITY_ALL:
      return {
        ...state,
        ...action.validity
      };

    default:
      return state;
  }
}
