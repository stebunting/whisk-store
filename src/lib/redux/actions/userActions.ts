// Requirements
import { Action } from 'redux';

// Redux Actions
import types from './actionTypes';

export interface UserAction extends Action<string> {
  payload: {
    [key: string]: string | boolean | number
  }
}

// Action creator to update a single user field
export type UpdateUserAction = (name: string, value: string | boolean) => UserAction;
export function updateUser(name: string, value: string | boolean): UserAction {
  return {
    type: types.UPDATE_USER_FIELD,
    payload: {
      [name]: value
    }
  };
}
