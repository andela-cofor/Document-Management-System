import { combineReducers } from 'redux';
import flashMessages from '../reducers/flashMessages';
import auth from '../reducers/auth';
import documents from '../reducers/document';
import user from '../reducers/profile';
import search from '../reducers/search';

export default combineReducers({
  auth,
  flashMessages,
  documents,
  user,
  search,
});
