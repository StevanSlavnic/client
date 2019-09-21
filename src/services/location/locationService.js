import axiosInstance from "../axiosDefaultInstance";

export const createLocation = locationData => {
  const url = "/locations/create";

  console.log(locationData);

  return axiosInstance.post(url, locationData);
};

export const getAllLocations = () => {
  const url = "/locations";

  return axiosInstance.get(url);
};

export const deleteLocation = locationData => {
  const url = `/locations/${locationData}`;

  console.log(locationData);

  return axiosInstance.delete(url, locationData);
};
