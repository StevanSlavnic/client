import axiosInstance from "../axiosDefaultInstance";

export const createLocation = locationData => {
  const url = "/locations/create";

  return axiosInstance.post(url, locationData);
};

export const editLocation = (location, locationData) => {
  const url = `/locations/${location}`;

  console.log(url);

  return axiosInstance.put(url, locationData);
};

export const deleteLocation = locationData => {
  const url = `/locations/${locationData}`;

  return axiosInstance.delete(url, locationData);
};

export const getLocation = locationData => {
  const url = `/locations/${locationData}`;

  return axiosInstance.get(url, locationData);
};

export const getAllLocations = (queryParamOne, queryParamTwo) => {
  console.log(queryParamOne, queryParamTwo);

  const url = `/locations${queryParamOne ? "?keyword=" + queryParamOne : ""}${
    queryParamTwo ? "?city=" + queryParamTwo : ""
  }`;

  return axiosInstance.get(url);
};
