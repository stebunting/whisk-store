// Config
import types from '../actions/actionTypes';
import initialState from '../initialState';

// Redux Actions
import { CheckoutFormAction } from '../actions/checkoutFormActions';

// Types
import { FormValidity } from '../../../types/FormValidity';

function checkoutFormReducer(
  state = initialState.validity, action: CheckoutFormAction
): FormValidity {
  switch (action.type) {
    case types.UPDATE_VALIDITY:
      if (action.payload && Object.prototype.hasOwnProperty.call(state, action.payload.name)) {
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
