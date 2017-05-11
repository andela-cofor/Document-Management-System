import axios from 'axios';
import { PAGINATED_DOCUMENTS } from './types';

export function setPaginateDocument(documents, pageCount) {
  return {
    type: PAGINATED_DOCUMENTS,
    documents,
    pageCount
  };
}

/**
 * @export
 * @param {any} offset
 * @param {any} limit
 * @returns {object} object
 */
export default function paginateDocumentActions(offset, limit) {
  return (dispatch) => {
    return axios.get(`/documents/?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch(setPaginateDocument(response.data.documents.rows,
          response.data.pagination.pageCount));
      }).catch((err) => {
      });
  };
}
