import * as types from './actionTypes';

export function loadProductsSuccess(name, value) {
  return {
    type: types.UPDATE_USER_FIELD,
    payload: {
      [name]: value
    }
  };
}
