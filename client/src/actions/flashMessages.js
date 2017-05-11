import { ADD_FLASH_MESSAGE } from './types';

/**
 * @export
 * @param {any} message
 * @returns {object} response
 */
export default function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
