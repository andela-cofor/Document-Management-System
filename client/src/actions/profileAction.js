import axios from 'axios';
import { GET_CURRENT_USER } from './types';

export function getCurrentUser(user) {
  return {
    type: GET_CURRENT_USER,
    user
  };
}

export default function getUser(userId) {
  return (dispatch) => {
    return axios.get(`/users/${userId}`)
      .catch((err) => {

      });
  };
}

export function updateUser(data, userID) {
  return (dispatch) => {
    return axios.put(`/users/${userID}`, data)
      .then((res)=> {
        Materialize.toast(res.data.message, 4000, 'rounded');
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      })
  };
}
