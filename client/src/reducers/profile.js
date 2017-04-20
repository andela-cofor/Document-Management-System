import { SET_USER_ID } from '../actions/types';

export default function user(state = [], action = {}) {
  switch(action.type) {
    case SET_USER_ID:
      return [
        ...state,
        action.id,
      ];
    default: return state;
  }
}




