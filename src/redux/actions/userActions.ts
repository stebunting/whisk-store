// Redux Actions
import types from './actionTypes';

export function updateUser(name, value) {
  return {
    type: types.UPDATE_USER_FIELD,
    payload: {
      [name]: value
    }
  };
}

export function updateUserAddress(formattedAddress, zone) {
  return {
    type: types.UPDATE_USER_ADDRESS,
    payload: {
      formattedAddress,
      zone
    }
  };
}
