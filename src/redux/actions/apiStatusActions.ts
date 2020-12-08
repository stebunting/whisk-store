// Redux Actions
import types from './actionTypes';

export interface ApiStatusType {
  type: string
}

export function beginApiCall(): ApiStatusType {
  return {
    type: types.BEGIN_API_CALL
  };
}
