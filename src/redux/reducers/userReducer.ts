// Config
import types from '../actions/actionTypes';
import initialState from './initialState';

// Types
import { User } from '../../types/User';
import { UserAction } from '../actions/userActions';

function userReducer(state = initialState.user, action: UserAction): User {
  switch (action.type) {
    case types.UPDATE_USER_FIELD:
      return {
        ...state,
        ...action.payload
      };

    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        address: action.payload.formattedAddress as string,
        verifiedAddress: action.payload.formattedAddress as string,
        zone: action.payload.zone as number
      };

    default:
      return state;
  }
}

export default userReducer;
