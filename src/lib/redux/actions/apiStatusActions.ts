// Requirements
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../types/AppState';

// Redux Actions
import types from './actionTypes';

export type ApiDispatch = ThunkDispatch<AppState, null, Action<string>>

export function beginApiCall(): Action<string> {
  return {
    type: types.BEGIN_API_CALL
  };
}
