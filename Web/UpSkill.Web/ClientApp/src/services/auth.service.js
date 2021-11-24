import axios from "axios";
import jwt from 'jwt-decode'

import { Base_URL } from '../utils/baseUrlConstant';

const API_URL = Base_URL + "Identity/";
let refreshTokenTimeout = "";

const refreshToken = () => {
  axios.post(API_URL + "refreshToken", {});
  //TODO: Must return ApplicationUser object here.
}

refreshToken = async () => {
  this.stopRefreshTokenTimer();
  try {
      const user = await agent.Account.refreshToken();
      runInAction(() => this.user = user);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
  } catch (error) {
      console.log(error);
  }
}

startRefreshTokenTimer = (user) => {
  const jwtToken = JSON.parse(user.token.split('.')[1]);
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - (60 * 1000);
  this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
}

stopRefreshTokenTimer() {
  clearTimeout(this.refreshTokenTimeout);
}

const register = (firstName, lastName, companyName, email, password, confirmPassword) => { 
  return axios.post(API_URL + "register", { 
    firstName,
    lastName, 
    companyName,
    email,
    password,
    confirmPassword,
  })
  .then(this.startRefreshTokenTimer(user));
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(jwt(response.data.token)));
      }

      this.startRefreshTokenTimer(user);
      return response.data;
    });
};

const logout = () => {
  return axios
    .post(API_URL + "logout")
    .then((res) => {
        localStorage.removeItem("user");
    });
};

const identity = {
  register,
  login,
  logout,
}

export default identity;
