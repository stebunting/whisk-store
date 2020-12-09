// Redux Actions
import types from './actionTypes';

// Types
import { FormValidity } from '../../types/FormValidity';

export interface CheckoutFormAction {
  type: string,
  payload?: {
    name: string,
    value: boolean
  }
  validity?: FormValidity
}

export type UpdateValidityType = (name: string, value: boolean) => CheckoutFormAction;

export function updateValidity(name: string, value: boolean): CheckoutFormAction {
  return {
    type: types.UPDATE_VALIDITY,
    payload: { name, value }
  };
}

export type UpdateValidityAllType = (validity: FormValidity) => void;

export function updateValidityAll(validity: FormValidity): CheckoutFormAction {
  return {
    type: types.UPDATE_VALIDITY_ALL,
    validity
  };
}
