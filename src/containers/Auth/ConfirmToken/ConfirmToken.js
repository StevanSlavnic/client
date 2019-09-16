import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/indexActions";
import * as authService from "../../../services/auth/authService";

class ConfirmToken extends Component {
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const code = query.get("token");

    if (code === null) {
      //this.props.addSnackbar({
      //message: "Sorry, your confirmation link is invalid.",
      //type: "error",
      //timeout: 8000
      //});

      this.props.history.push("/");
    } else {
      authService
        .confirmEmail(code)
        .then(response => {
          this.props.onAutoLogin(response.data.token, response.data.user);
          //@TODO - Store user as response.data.user
          // this.props.snackbarAdd({
          //     message: "Excellent! You've successfully activated your account.",
          //   timeout: 8000
          //});

          this.props.history.push("/");
        })
        .catch(error => {
          console.log(error.response);
          // this.props.snackbarAdd({
          //   message: error.response.data.message,
          // type: "error",
          //  timeout: 8000
          // });
          this.props.history.push("/");
        });
    }
  }
  render() {
    return <h1 style={{ marginTop: "30px" }}>Confirmation in progress...</h1>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //snackbarAdd: snackConf => dispatch(actions.snackbarAdd(snackConf)),
    onAutoLogin: (tokenData, userData) =>
      dispatch(actions.authUsingToken(tokenData, userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ConfirmToken);
