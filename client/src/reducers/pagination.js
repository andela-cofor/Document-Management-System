import
  { PAGINATED_DOCUMENTS,
    PAGINATED_USERS } from '../actions/types';

const initialState = {
  items: [],
  pageCount: 0
};

/**
 * @export
 * @param {any} [state={}]
 * @param {any} [action={}]
 * @returns {object} object
 */
export default function documents(state = initialState, action = {}) {
  switch (action.type) {
    case PAGINATED_DOCUMENTS:
      return {
        items: action.documents,
        pageCount: action.pageCount
      };
    case PAGINATED_USERS:
      return {
        items: action.users,
        pageCount: action.pageCount
      };
    default: return state;
  }
}
