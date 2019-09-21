import axiosInstance from "../axiosDefaultInstance";

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
  const url = "/users/show/refresh";
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

  console.log(params);

  return axiosInstance.patch(url, params);
};
