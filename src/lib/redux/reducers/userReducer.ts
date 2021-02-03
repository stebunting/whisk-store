// Config
import types from '../actions/actionTypes';
import initialState from '../initialState';

// Redux Actions
import { UserAction } from '../actions/userActions';

// Types
import { User } from '../../../types/User';

function userReducer(
  state = initialState.user, action: UserAction
): User {
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
