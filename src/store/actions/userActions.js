import * as userService from "./../../services/user/userService";
import * as actionTypes from "./actionTypes";
import { logout } from "./authActions";

export const setLoggedInUser = userData => {
  return {
    type: actionTypes.USER_SET_LOGGED,
    userData: userData
  };
};

export const unsetLoggedUser = () => {
  return {
    type: actionTypes.USER_UNSET_LOGGED
  };
};

export const getLoggedUser = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      // @TODO autorefresh on expire token, added some logic. Remove this comment if this works
      dispatch(logout());
    } else {
      const tokenData = JSON.parse(token);
      console.log("token data", tokenData);
      return userService
        .getLoggedUser(tokenData)
        .then(response => {
          dispatch(setLoggedInUser(response.data));
          return response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
};

export const forgotPasswordUser = () => {
  return {
    type: actionTypes.USER_FORGOT_PASS
  };
};
