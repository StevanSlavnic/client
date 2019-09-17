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

    if (!token) {
      // @TODO autorefresh on expire token, added some logic. Remove this comment if this works
      dispatch(logout());
    } else {
      const tokenData = JSON.parse(token);

      const tokenParsed = tokenData.token;

      return userService
        .getLoggedUser(tokenParsed)
        .then(response => {
          console.log(response.data);
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
