import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_MESSAGE,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function Auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        state: 'opened', 
        type: 'success' , 
        message: payload, 
        isLoggedIn: true,
        user
      };
    case REGISTER_FAIL:
      return {
        state: 'opened', 
        type: 'error' ,
        message: payload,
        isLoggedIn: false,
        user: null
      };      
    case LOGIN_SUCCESS:
      return {
        state: 'opened', 
        type: 'success' ,
        message: payload,
        isLoggedIn: true,
        user
      }; 
    case LOGIN_FAIL:
      return {
        state: 'opened', 
        type: 'error' ,
        message: payload,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        state: 'opened', 
        type: 'success' ,
        message: payload,
        isLoggedIn: false,
        user: null
      };
    case CLEAR_MESSAGE:
        return {
          state: 'closed',
          type: '' ,
          message: ''
        }; 
    default:
      return state;
  }
} 
