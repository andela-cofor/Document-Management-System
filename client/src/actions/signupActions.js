import axios from 'axios';
import swal from 'sweetalert';
import jwt from 'jsonwebtoken';
import setHeaderToken from '../../utils/setHeaderToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/users', userData)
    .then((res) => {
      swal({
        title: 'Signup Succesful',
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
