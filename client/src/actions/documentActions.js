import axios from 'axios';
import { SET_DOCUMENTS, ADD_DOCUMENT, DOCUMENT_FETCHED, DOCUMENT_UPDATED, DOCUMENT_DELETED } from './types';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setDocuments(documents) {
  return {
    type: SET_DOCUMENTS,
    documents,
  };
}
export function addDocument(document) {
  return {
    type: ADD_DOCUMENT,
    document,
  };
}

export function documentFetched(document) {
  return {
    type: DOCUMENT_FETCHED,
    document,
  };
}

export function documentUpdated(document) {
  return {
    type: DOCUMENT_UPDATED,
    document,
  };
}

export function documentDeleted(documentId) {
  return {
    type: DOCUMENT_DELETED,
    documentId,
  };
}

export function saveDocument(data) {
  return (dispatch) => {
    return axios.post('/documents', data)
       .then(response => {
        dispatch(addDocument(response.data));
      })
      .catch(error => {
        throw(error);
      });
      // .then((res) => {
      //   console.log(res)
      // })
  };
}

export function fetchDocuments() {
  console.log('here')
  return (dispatch) => {
    return axios.get('/documents')
      .then(res => res.data)
      .then(data => dispatch(setDocuments(data.documents.rows)));
      // .then((res) => {
      //   console.log(res);
      // })
  };
}

export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}/documents`)
    .then(res => res.data)
    .then(data => dispatch(setDocuments(data.userDocuments.documents.rows)));
  };
}

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

export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
      .then((res) => {
        Materialize.toast(res.data.message, 4000, 'rounded');
      })
      .then(data => dispatch(documentDeleted(id)))
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}
