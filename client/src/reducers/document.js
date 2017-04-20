import { SET_DOCUMENTS, ADD_DOCUMENT, DOCUMENT_FETCHED, DOCUMENT_UPDATED, DOCUMENT_DELETED } from '../actions/types';

export default function documents(state = [], action = {}) {
  switch(action.type) {
    case ADD_DOCUMENT:
      return [
        ...state,
        action.document,
      ];
    case DOCUMENT_FETCHED:
      {
        const index = state.findIndex(item => item.id === action.document.id);
        if (index > -1) {
          return state.map(item => {
            if (item.id === action.document.id) return action.document;
            return item;
          });
        } else {
          return [
            ...state,
            action.document,
          ];
        }
      }
    case DOCUMENT_UPDATED:
      return state.map(item => {
        if (item.id === action.document.id) return action.document;
        return item;
      });
    case DOCUMENT_DELETED:
      return state.filter(item => item.id !== action.documentId)
    case SET_DOCUMENTS:
      return action.documents;
    default: return state;
  }
}
