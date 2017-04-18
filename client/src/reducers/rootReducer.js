import { combineReducers } from 'redux';
import flashMessages from '../reducers/flashMessages';
import auth from '../reducers/auth';
import documents from '../reducers/document';

export default combineReducers({
  auth,
  flashMessages,
  documents,
});
