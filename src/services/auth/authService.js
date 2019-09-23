import axiosInstance from "../axiosDefaultInstance";

/**
 * login user call
 * @param data {email, password}
 * @returns {AxiosPromise<any>}
 */

export const create = data => {
  const url = "/users/create";
  const params = {
    ...data
  };

  return axiosInstance.post(url, params);
};

export const confirm = data => {
  const url = `/auth/confirm/${data}`;

  return axiosInstance.get(url, data);
};

export const login = data => {
  const url = "/auth/login";
  const params = {
    ...data
  };

  return axiosInstance.post(url, params);
};
