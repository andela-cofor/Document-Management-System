import axios from 'axios';

export function userDocumentRequest(userData) {
  return (dispatch) => {
    return axios.get('/documents', userData);
  };
}
