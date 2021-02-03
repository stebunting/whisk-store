// Requirements
import { Action } from 'redux';

// Redux Actions
import types from './actionTypes';

// Types
import { FormValidity } from '../../../types/FormValidity';

export interface CheckoutFormAction extends Action<string> {
  payload?: {
    name: string,
    value: boolean | null
  }
  validity?: FormValidity
}

// Action creator to update the validity of a single form item
export type UpdateValidityType = (name: string, value: boolean | null) => CheckoutFormAction;
export function updateValidity(name: string, value: boolean | null): CheckoutFormAction {
  return {
    type: types.UPDATE_VALIDITY,
    payload: { name, value }
  };
}

// Action creator to update the validity of all form items
export type UpdateValidityAllType = (validity: FormValidity) => CheckoutFormAction;
export function updateValidityAll(validity: FormValidity): CheckoutFormAction {
  return {
    type: types.UPDATE_VALIDITY_ALL,
    validity
  };
}
