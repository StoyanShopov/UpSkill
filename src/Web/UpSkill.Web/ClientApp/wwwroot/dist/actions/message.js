import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export var setMessage = function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message
  };
};

export var clearMessage = function clearMessage() {
  return {
    type: CLEAR_MESSAGE
  };
};