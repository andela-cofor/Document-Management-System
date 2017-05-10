import { SEARCH_RESULTS } from '../actions/types';

export default function documents(state = [], action = {}) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return action.documentSearchResult;
    default: return state;
  }
}
