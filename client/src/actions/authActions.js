import axios from 'axios';
import jwt from 'jsonwebtoken';
import setHeaderToken from '../../utils/setHeaderToken';
import { SET_CURRENT_USER, SET_USER_ID } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setUserID(id) {
  return {
    type: SET_USER_ID,
    id
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setHeaderToken(false);
    dispatch(setCurrentUser({}));
    Materialize.toast('You have logged out succesfully', 4000, 'rounded');
  };
}

export function userLoginRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/login', userData)
      .then((res) => {
        Materialize.toast(res.data.message, 4000, 'rounded');
        const token = res.data.token;
        localStorage.setItem('token', token);
        setHeaderToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        dispatch(setUserID(res.data.user.id));
      });
  };
}
