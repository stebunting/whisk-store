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

    default:
      return state;
  }
}

export default userReducer;
