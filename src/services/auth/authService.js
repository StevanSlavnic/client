import axiosInstance from "../axiosDefaultInstance";
import apiConf from "../../utils/apiConfig";

/**
 * login user call
 * @param data {email, password}
 * @returns {AxiosPromise<any>}
 */
export const login = data => {
  const url = "/auth/login";
  const params = {
    ...data
  };

  return axiosInstance.post(url, params);
};

export const refreshToken = data => {
  const url = "/oauth/v2/token";
  const params = {
    ...data
  };

  return axiosInstance.post(url, params);
};

export const confirmEmail = code => {
  const url = "/user/confirm";
  const params = {
    token: code
  };

  return axiosInstance.patch(url, params);
};
