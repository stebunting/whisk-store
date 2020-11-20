import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.UPDATE_USER_FIELD:
      return {
        ...state,
        ...action.payload
      };

    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        address: action.payload.formattedAddress,
        verifiedAddress: action.payload.formattedAddress,
        zone: action.payload.zone
      };

    default:
      return state;
  }
}
