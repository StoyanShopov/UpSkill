import axios from "axios";
import jwt from 'jwt-decode'


const API_URL = "https://localhost:44319/Identity/";

const register = (firstName, lastName, companyName, email, password, confirmPassword) => { 
  return axios.post(API_URL + "register", { 
    firstName,
    lastName, 
    companyName,
    email,
    password,
    confirmPassword,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(jwt(response.data.token)));
      }

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
