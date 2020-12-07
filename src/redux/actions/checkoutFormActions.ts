// Redux Actions
import types from './actionTypes';

// Types
import { FormValidity } from '../../types/FormValidity';

export function updateValidity(name: string, value: boolean) {
  return {
    type: types.UPDATE_VALIDITY,
    payload: { name, value }
  };
}

export function updateValidityAll(validity: FormValidity) {
  return {
    type: types.UPDATE_VALIDITY_ALL,
    validity
  };
}
