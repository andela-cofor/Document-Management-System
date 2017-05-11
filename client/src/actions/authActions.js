import axios from 'axios';
import jwt from 'jsonwebtoken';
import setHeaderToken from '../../utils/setHeaderToken';
import { SET_CURRENT_USER, SET_USER_ID, SET_ROLE_ID } from './types';

/**
 * @export
 * @param {any} user
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @export
 * @param {any} id
 * @returns {void}
 */
export function setUserID(id) {
  return {
    type: SET_USER_ID,
    id
  };
}

/**
 * @export
 * @returns {void}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setHeaderToken(false);
    dispatch(setCurrentUser({}));
    Materialize.toast('You have logged out succesfully', 4000, 'rounded');
  };
}

/**
 * @export
 * @param {any} userData
 * @returns {object} response
 */
export function userLoginRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/login', userData)
      .then((res) => {
        Materialize.toast(res.data.message, 4000, 'rounded');
        const token = res.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('roles', res.data.user.id);
        setHeaderToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        dispatch(setUserID(res.data.user.id));
      });
  };
}
