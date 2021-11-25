import axios from "axios";
import TokenService from "./tokenService";

import { Base_URL } from '../utils/baseUrlConstant';

const API_URL = Base_URL + "Identity/";


const register = (firstName, lastName, companyName, email, password, confirmPassword) => { 
  return axios.post(API_URL + "register", { 
    firstName,
    lastName, 
    companyName,
    email,
    password,
    confirmPassword,
  })
  
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  return axios
    .post(API_URL + "logout")
    .then((res) => {
        TokenService.removeUser();
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const identity = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default identity;
