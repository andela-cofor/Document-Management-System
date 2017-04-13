import axios from 'axios';
import swal from 'sweetalert';

export function userLoginRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/login', userData);
  };
}
