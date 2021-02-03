// Requirements
import { Action } from 'redux';

// Redux Actions
import types from './actionTypes';

export interface DeliveryAction extends Action<string> {
  payload: {
    address?: string,
    zone?: number,
  }
}

// Action Creator to update the delivery state after using Google Autocomplete
export type UpdateDeliveryAction = (address: string, zone: number) => DeliveryAction;
export function updateDelivery(address: string, zone: number): DeliveryAction {
  return {
    type: types.UPDATE_DELIVERY,
    payload: {
      address,
      zone
    }
  };
}
