// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { ApiStatusType } from '../actions/apiStatusActions';

function actionTypeEndsInSuccess(type: string): boolean {
  return type.substring(type.length - 8) === '_SUCCESS';
}

function apiCallStatusReducer(state = initialState.apiCallsInProgress, action: ApiStatusType): number {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  }
  if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}

export default apiCallStatusReducer;
