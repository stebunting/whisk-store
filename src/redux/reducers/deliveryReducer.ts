// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { DeliveryAction } from '../actions/deliveryActions';
import { Delivery } from '../../types/Delivery';

function deliveryReducer(state = initialState.delivery, action: DeliveryAction): Delivery {
  switch (action.type) {
    case types.UPDATE_DELIVERY:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

export default deliveryReducer;
