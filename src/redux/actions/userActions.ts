// Redux Actions
import types from './actionTypes';

export function updateUser(name: string, value: string | boolean) {
  return {
    type: types.UPDATE_USER_FIELD,
    payload: {
      [name]: value
    }
  };
}

export function updateUserAddress(formattedAddress: string, zone: number) {
  return {
    type: types.UPDATE_USER_ADDRESS,
    payload: {
      formattedAddress,
      zone
    }
  };
}
