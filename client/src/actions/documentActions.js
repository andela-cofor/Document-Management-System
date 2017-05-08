import axios from 'axios';
import { SET_DOCUMENTS, ADD_DOCUMENT, DOCUMENT_FETCHED, DOCUMENT_UPDATED, DOCUMENT_DELETED } from './types';


/**
 * @param {any} response
 * @returns {object} response
 */
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


/**
 * @export
 * @param {any} documents
 * @returns {object} response
 */
export function setDocuments(documents) {
  return {
    type: SET_DOCUMENTS,
    documents,
  };
}


/**
 * @export
 * @param {any} document
 * @returns {object} response
 */
export function addDocument(document) {
  return {
    type: ADD_DOCUMENT,
    document,
  };
}


/**
 * @export
 * @param {any} document
 * @returns {object} response
 */
export function documentFetched(document) {
  return {
    type: DOCUMENT_FETCHED,
    document,
  };
}

/**
 * @export
 * @param {any} document
 * @returns {object} response
 */
export function documentUpdated(document) {
  return {
    type: DOCUMENT_UPDATED,
    document,
  };
}

/**
 * @export
 * @param {any} documentId
 * @returns {object} response
 */
export function documentDeleted(documentId) {
  return {
    type: DOCUMENT_DELETED,
    documentId,
  };
}

/**
 * @export
 * @param {any} data
 * @returns {object} response
 */
export function saveDocument(data) {
  console.log(data);
  return (dispatch) => {
    return axios.post('/documents', data)
       .then(response => {
        dispatch(addDocument(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
}

/**
 * @export
 * @returns {object} response
 */
export function fetchDocuments() {
  return (dispatch) => {
    return axios.get('/documents')
      .then(res => res.data)
      .then(data => dispatch(setDocuments(data.documents.rows)));
  };
}

/**
 * @export
 * @param {any} id
 * @returns {object} response
 */
export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}/documents`)
    .then(res => res.data)
    .then(data => dispatch(setDocuments(data.userDocuments.documents.rows)));
  };
}

/**
 * @export
 * @param {any} data
 * @returns {object} response
 */
export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, data)
      .then(()=> {window.location = '/app/document'})
      .then(res => res.data)
      .then(data => dispatch(documentUpdated(data)))
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}

/**
 * @export
 * @param {any} id
 * @returns {object} response
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
      .then(data => dispatch(documentDeleted(id)))
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}
