// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

interface UserAction {
  type: string
  payload: {
    [key: string]: { value: string }
  }
}

function userReducer(state = initialState.user, action: UserAction) {
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

export default userReducer;
