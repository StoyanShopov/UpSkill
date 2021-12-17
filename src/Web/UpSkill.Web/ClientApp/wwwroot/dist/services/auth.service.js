import axios from "axios";
import jwt from 'jwt-decode';

import { Base_URL } from '../utils/baseUrlConstant';

var API_URL = Base_URL + "Identity/";

var register = function register(firstName, lastName, companyName, email, password, confirmPassword) {
  return axios.post(API_URL + "register", {
    firstName: firstName,
    lastName: lastName,
    companyName: companyName,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  });
};

var login = function login(email, password) {
  return axios.post(API_URL + "login", {
    email: email,
    password: password
  }).then(function (response) {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(jwt(response.data.token)));
    }

    return response.data;
  });
};

var logout = function logout() {
  return axios.post(API_URL + "logout").then(function (res) {
    localStorage.removeItem("user");
  });
};

var identity = {
  register: register,
  login: login,
  logout: logout
};

export default identity;