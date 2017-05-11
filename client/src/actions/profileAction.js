import axios from 'axios';
import { GET_CURRENT_USER } from './types';

/**
 * @export
 * @param {any} user
 * @returns {void}
 */
export function getCurrentUser(user) {
  return {
    type: GET_CURRENT_USER,
    user
  };
}

/**
 * @export
 * @param {any} userId
 * @returns {object} response
 */
export default function getUser(userId) {
  return (dispatch) => {
    return axios.get(`/users/${userId}`)
      .catch((err) => {
      });
  };
}

/**
 * @export
 * @param {any} data
 * @param {any} userID
 * @returns {object} response
 */
export function updateUser(data, userID) {
  return (dispatch) => {
    return axios.put(`/users/${userID}`, data)
      .then((res)=> {
        Materialize.toast(res.data.message, 4000, 'rounded');
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}
