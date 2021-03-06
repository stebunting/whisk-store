// Config
import types from '../actions/actionTypes';
import initialState from '../initialState';

// Redux Actions
import { DeliveryAction } from '../actions/deliveryActions';
import { BasketAction } from '../actions/basketActions';

// Types
import { Delivery } from '../../../types/Delivery';

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

    case types.LOAD_BASKET_SUCCESS:
    case types.UPDATE_BASKET_SUCCESS:
    case types.UPDATE_BASKET_ZONE_SUCCESS:
    case types.REMOVE_ITEM_FROM_BASKET_SUCCESS:
    case types.RESET_BASKET_SUCCESS:
      return {
        ...state,
        deliverable: (action as BasketAction).payload.basket.delivery.deliverable,
        deliveryRequired: (action as BasketAction).payload.basket.delivery.deliveryRequired
      };

    default:
      return state;
  }
}

export default deliveryReducer;
