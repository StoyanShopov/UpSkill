import axios from "axios";
import TokenService from "./tokenService";

import { Base_URL } from "../utils/baseUrlConstant";
import { logout } from "../actions/auth";
import { refreshToken } from "../actions/auth";

const instance = axios.create({
  baseURL: Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const setup = (store) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        
        config.headers["www-authenticate"] = 'Bearer ' + token; 
            }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { dispatch } = store;
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {


    if (originalConfig.url !== "Identity/Login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("Identity/refreshToken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          dispatch(refreshToken(accessToken));
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

    return Promise.reject(err);
  }
);
}

