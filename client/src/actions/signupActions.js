import axios from 'axios';
import swal from 'sweetalert';

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/users', userData);
  };
}
