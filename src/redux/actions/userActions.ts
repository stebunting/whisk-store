// Redux Actions
import types from './actionTypes';

export interface UserAction {
  type: string
  payload: {
    [key: string]: string | boolean | number
  }
}

export type UpdateUserAction = (name: string, value: string | boolean) => UserAction;

export function updateUser(name: string, value: string | boolean): UserAction {
  return {
    type: types.UPDATE_USER_FIELD,
    payload: {
      [name]: value
    }
  };
}
