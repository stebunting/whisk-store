// Redux Actions
import types from './actionTypes';

export interface UserAction {
  type: string
  payload: {
    [key: string]: string | boolean | number
  }
}

export type UpdateUserAction = (name: string, value: string | boolean) => void;

export function updateUser(name: string, value: string | boolean): UserAction {
  return {
    type: types.UPDATE_USER_FIELD,
    payload: {
      [name]: value
    }
  };
}

export type UpdateUserAddressAction = (formattedAddress: string, zone: number) => void;

export function updateUserAddress(formattedAddress: string, zone: number): UserAction {
  return {
    type: types.UPDATE_USER_ADDRESS,
    payload: {
      formattedAddress,
      zone
    }
  };
}
