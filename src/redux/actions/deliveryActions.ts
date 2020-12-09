// Redux Actions
import types from './actionTypes';

export interface DeliveryAction {
  type: string
  payload: {
    address: string,
    zone: number
  }
}

export type UpdateDeliveryAction = (address: string, zone: number) => DeliveryAction;

export function updateDelivery(address: string, zone: number): DeliveryAction {
  return {
    type: types.UPDATE_DELIVERY,
    payload: {
      address: address,
      zone
    }
  };
}
