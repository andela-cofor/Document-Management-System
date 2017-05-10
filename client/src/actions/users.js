import axios from 'axios';
import { SET_USERS, USER_DELETED } from './types';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/users')
      .then(res => res.data)
      .then(data => {
        dispatch(setUsers(data.users.rows));
      });
  };
}

export function userDeleted(userId) {
  return {
    type: USER_DELETED,
    userId,
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
      .then((res) => {
        Materialize.toast(res.data.message, 4000, 'rounded');
      })
      .then(data => dispatch(userDeleted(id)))
      .catch((err) => {
        Materialize.toast(err.response.data.message, 4000, 'rounded');
      });
  };
}
