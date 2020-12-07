// Redux Actions
import types from './actionTypes';

export function updateValidity(name, value) {
  return {
    type: types.UPDATE_VALIDITY,
    payload: { name, value }
  };
}

export function updateValidityAll(validity) {
  return {
    type: types.UPDATE_VALIDITY_ALL,
    validity
  };
}
