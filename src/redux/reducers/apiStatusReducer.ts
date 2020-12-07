// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

interface ApiStatusType {
  type: string
}

function actionTypeEndsInSuccess(type: string) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

function apiCallStatusReducer(state = initialState.apiCallsInProgress, action: ApiStatusType) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  }
  if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}

export default apiCallStatusReducer;
