import axios from 'axios';
import { SEARCH_RESULTS } from './types';

/**
 * @export
 * @param {any} documentSearchResult 
 * @returns {void}
 */
export function documentsSearched(documentSearchResult) {
  return {
    type: SEARCH_RESULTS,
    documentSearchResult,
  };
}

/**
 * @export
 * @param {any} queryString 
 * @returns {object} response
 */
export function searchDocuments(queryString) {
  return (dispatch) => {
    return axios.get(`/search/documents/?query=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched(res.data.documents.rows));
      });
  };
}

/**
 * @export
 * @param {any} queryString
 * @returns {object} response
 */
export function searchUsers(queryString) {
  return (dispatch) => {
    return axios.get(`/search/users/?query=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched([res.data.user]));
      });
  };
}
