import axios from "axios";
import TokenService from "./tokenService";
import instance from "./instance";
import jwt from "jwt-decode";

import { Base_URL } from "../utils/baseUrlConstant";

import authHeader from './auth-header';

const API_URL = Base_URL + "Identity/";
const userStorageVarName = "user";


const register = async (firstName, lastName, companyName, email, password, confirmPassword) => { 
  return instance.post(API_URL + "register", { 
    firstName,
    lastName,
    companyName,
    email,
    password,
    confirmPassword,
  })
};

const login = async (email, password) => {
  return instance
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        TokenService.setUser(response.data);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem(userStorageVarName, JSON.stringify(jwt(response.data.token)));
      }
      return response.data;
    });
};

const logout = async () => {
  return await axios
    .post(API_URL + "logout")
    .then((res) => {
        localStorage.removeItem("user");      
        localStorage.removeItem("token");      
    });
};

export const getUser = () => JSON.parse(localStorage.getItem(userStorageVarName)) || null;

const identity = {
  register,
  login,
  logout,
  getUser,
}

export default identity;
