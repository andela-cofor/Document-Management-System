import axios from 'axios';
import jwt from 'jsonwebtoken';
import swal from 'sweetalert';
import setHeaderToken from '../../utils/setHeaderToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setHeaderToken(false);
    dispatch(setCurrentUser({}));
    swal({
      title: 'Logout Succesful',
      type: 'success',
      confirmButtonColor: '#9068be',
      confirmButtonText: 'Ok',
      closeOnConfirm: false,
      html: false
    });
    
  }
}

export function userLoginRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/login', userData)
      .then((res) => {
        swal({
          title: 'Login Succesful',
          text: res.data.message,
          type: 'success',
          confirmButtonColor: '#9068be',
          confirmButtonText: 'Ok',
          closeOnConfirm: false,
          html: false
        });
        const token = res.data.token;
        localStorage.setItem('token', token);
        setHeaderToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
  };
}
