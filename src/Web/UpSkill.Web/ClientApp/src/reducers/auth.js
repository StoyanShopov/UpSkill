import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_WARNING_MESSAGE,
  CLEAR_MESSAGE,
  CHECK_CURRENT_STATE,
} from "../actions/types";

import {
  AdministratorRoleName,
  CompanyOwnerRoleName,
  EmployeeRoleName,
} from '../utils/webConstants';

const user = () => JSON.parse(localStorage.getItem("user"));

const initialState =  { 
      isLoggedIn: false,
      user: null,
      isAdmin: false,
      isCompanyOwner: false,
      isEmployee: false
    };

export default function Auth(init = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        state: 'opened', 
        type: 'success' , 
        message: payload, 
        isLoggedIn: true,        
        user: user(),
        isAdmin: user()?.role === AdministratorRoleName,
        isCompanyOwner: user()?.role === CompanyOwnerRoleName,
        isEmployee: user()?.role===EmployeeRoleName,
      };
    case REGISTER_FAIL:
      return {
        state: 'opened', 
        type: 'error' ,
        message: payload,
        isLoggedIn: false,
        user: null,
      };      
    case LOGIN_SUCCESS:
      return {
        state: 'opened', 
        type: 'success' ,
        message: payload,
        isLoggedIn: true,        
        user: user(),
        isAdmin: user()?.role === AdministratorRoleName,
        isCompanyOwner: user()?.role === CompanyOwnerRoleName,
        isEmployee: user()?.role===EmployeeRoleName,
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
        user: null,
      };
      case SET_WARNING_MESSAGE:
        return {
          state: 'opened', 
          type: 'warning' ,
          message: payload.message,
          link: payload.link,
        };
    case CLEAR_MESSAGE:
        return {
          state: 'closed',
          type: '' ,
          message: '',
        }; 
    case CHECK_CURRENT_STATE:
        return {
          state: 'closed',
          type: '' ,
          message: '',
          isLoggedIn: user() ? true : false,
          user: user(),
          isAdmin: user()?.role === AdministratorRoleName,
          isCompanyOwner: user()?.role === CompanyOwnerRoleName,
          isEmployee: user()?.role===EmployeeRoleName,
        }; 
    default:
      return init;
  }
} 
