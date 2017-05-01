import axios from 'axios';
import { SEARCH_RESULTS } from './types';

export function documentsSearched(documentSearchResult) {
  return {
    type: SEARCH_RESULTS,
    documentSearchResult,
  };
}

export function searchDocuments(queryString) {
  return (dispatch) => {
    return axios.get(`/search/documents/?query=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched(res.data.documents.rows));
      });
  };
}

export function searchUsers(queryString) {
  return (dispatch) => {
    return axios.get(`/search/users/?query=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched([res.data.user]));
      });
  };
}
