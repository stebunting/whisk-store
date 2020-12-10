// Requirements
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from '../../types/ReduxState';

// Redux Actions
import types from './actionTypes';

export type ApiDispatch = ThunkDispatch<ReduxState, null, Action<string>>

export function beginApiCall(): Action<string> {
  return {
    type: types.BEGIN_API_CALL
  };
}
