import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message, link) => ({
  type: SET_MESSAGE,
  payload: message,
  link: link,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
}); 
