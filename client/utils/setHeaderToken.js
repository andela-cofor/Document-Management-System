import axios from 'axios';

/**
 * @export
 * @param {any} token
 * @return {string} token
 */
export default function setHeader(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
