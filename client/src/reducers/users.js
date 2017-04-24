import { SET_USERS, USER_DELETED } from '../actions/types';

export default function users(state = [], action = {}) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case USER_DELETED:
      return state.filter(item => item.id !== action.userId);
    default: return state;
  }
}


