import { SET_USER_ID } from '../actions/types';

/**
 * @export
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {Array} state
 */
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
