import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_MESSAGE,
} from "../actions/types";

import {
  AdministratorRoleName,
  CompanyOwnerRoleName,
  EmployeeRoleName,
} from '../utils/webConstants';

const user = () => JSON.parse(localStorage.getItem("user")) || null;

const initialState = user
  ? { 
       state: 'opened', 
       type: 'success' , 
       message: '', 
       isLoggedIn: true,
       user: user,
       isAdmin: user()?.role === AdministratorRoleName,
       isCompanyOwner: user()?.role === CompanyOwnerRoleName,
       isEmployee: user()?.role===EmployeeRoleName,
    }
  : { isLoggedIn: false,
      user: null,
      isAdmin: false,
      isCompanyOwner: false,
      isEmployee: false};

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
    case CLEAR_MESSAGE:
        return {
          state: 'closed',
          type: '' ,
          message: ''
        }; 
    default:
      return init;
  }
} 
