// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { FormValidity } from '../../types/FormValidity';

interface CheckoutFormAction {
  type: string,
  payload?: {
    name: string,
    value: string
  }
  validity?: FormValidity
}

function checkoutFormReducer(state = initialState.validity, action: CheckoutFormAction) {
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

export default checkoutFormReducer;
