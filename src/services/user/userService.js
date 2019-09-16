import axiosInstance from "../axiosDefaultInstance";

/**
 * Get User data based on local storage token
 * @param token
 * @returns {AxiosPromise<any>}
 */
export const getLoggedUser = token => {
  const config = {
    headers: {
      "X-Auth-Token": "Bearer " + token
    }
  };
  const url = "/users/show";

  return axiosInstance.post(config, url);
};
