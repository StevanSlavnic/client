import axiosInstance from "../axiosDefaultInstance";

export const createLocation = locationData => {
  const url = "/locations/create";

  return axiosInstance.post(url, locationData);
};

export const editLocation = (locationId, locationData) => {
  const url = `/locations/${locationId}`;

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

export const getAllLocations = queryParamOne => {
  console.log(queryParamOne);

  const url = `/locations${queryParamOne ? "?keyword=" + queryParamOne : ""}`;

  return axiosInstance.get(url);
};
