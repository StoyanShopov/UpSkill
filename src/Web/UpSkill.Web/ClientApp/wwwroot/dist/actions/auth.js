import jwt from 'jwt-decode';

import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import AuthService from "../services/auth.service";

export var register = function register(firstName, lastName, companyName, email, password, confirmPassword) {
  return function (dispatch) {
    return AuthService.register(firstName, lastName, companyName, email, password, confirmPassword).then(function (response) {
      dispatch({
        type: REGISTER_SUCCESS
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      });

      return Promise.resolve();
    }, function (error) {
      var message = error.response && error.response.data && error.response.data.message || error.message || error.toString();

      dispatch({
        type: REGISTER_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    });
  };
};

export var login = function login(email, password) {
  return function (dispatch) {
    return AuthService.login(email, password).then(function (data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: jwt(data.token) }
      });

      return Promise.resolve();
    }, function (error) {
      var message = error.response && error.response.data && error.response.data.message || error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    });
  };
};

export var logout = function logout() {
  return function (dispatch) {
    AuthService.logout();

    dispatch({
      type: LOGOUT
    });
    return Promise.resolve();
  };
};