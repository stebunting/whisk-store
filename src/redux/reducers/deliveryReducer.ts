// Config
import types from '../actions/actionTypes';
import initialState from '../initialState';

// Redux Actions
import { DeliveryAction } from '../actions/deliveryActions';
import { BasketAction } from '../actions/basketActions';

// Types
import { Delivery } from '../../types/Delivery';

function deliveryReducer(
  state = initialState.delivery,
  action: DeliveryAction | BasketAction
): Delivery {
  switch (action.type) {
    case types.UPDATE_DELIVERY:
      return {
        ...state,
        ...action.payload
      };

    case types.UPDATE_BASKET_ZONE_SUCCESS:
      return {
        ...state,
        deliverable: (action as BasketAction).payload.basket.delivery.deliverable
      };

    default:
      return state;
  }
}

export default deliveryReducer;
