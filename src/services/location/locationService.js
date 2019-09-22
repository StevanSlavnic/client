import axiosInstance from "../axiosDefaultInstance";

export const createLocation = locationData => {
  const url = "/locations/create";

  return axiosInstance.post(url, locationData);
};

export const editLocation = (location, locationData) => {
  const url = `/locations/${location}`;

  console.log(url);

  // console.log(payload);

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

export const getAllLocations = () => {
  const url = "/locations";

  return axiosInstance.get(url);
};