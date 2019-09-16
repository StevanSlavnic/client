import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import clone from "lodash.clonedeep";

import classes from "./Auth.module.scss";
import * as actions from "../../store/actions/indexActions";
import { Form, Input } from "../../components/UI/Form/Form";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import * as validator from "../../utils/formValidator";

class Auth extends Component {
  state = {
    loading: false,
    formIsValid: false,
    formControls: {
      email: {
        id: "email",
        type: "email",
        placeholder: "Email address or Username",
        value: "",
        validation: {
          required: true
          //isEmail: true
        },
        error: "",
        valid: false,
        touched: false
      },
      password: {
        id: "password",
        type: "password",
        placeholder: "Password",
        value: "",
        showPassword: false,
        adornment: {
          position: "end",
          icon: () => (
            <IconButton
              className={classes.IconShowPassword}
              onClick={e => this.toggleShowPassword()}
            >
              {this.state.formControls.password.showPassword ? (
                <Visibility />
              ) : (
                <VisibilityOff />
              )}
            </IconButton>
          )
        },
        validation: {
          required: true
        },
        error: "",
        valid: false,
        touched: false
      }
    }
  };

  closeModal = () => {
    this.setState({ modalOpened: false });
  };

  openModal = () => {
    this.setState({ modalOpened: true });
  };

  toggleShowPassword() {
    const stateClone = clone(this.state);

    stateClone.formControls.password.showPassword = !stateClone.formControls
      .password.showPassword;
    stateClone.formControls.password.type = stateClone.formControls.password
      .showPassword
      ? "text"
      : "password";
    this.setState(stateClone);
  }

  inputChangeHandler = (e, controlName) => {
    const formControlsCopy = clone(this.state.formControls);

    formControlsCopy[controlName].value = e.target.value;
    formControlsCopy[controlName].touched = true;
    formControlsCopy[controlName].error = "";

    this.setState({
      formControls: formControlsCopy,
      formIsValid: validator.formIsValid(formControlsCopy)
    });
  };

  inputBlurHandler = (e, controlName) => {
    const formControlsCopy = clone(this.state.formControls);
    const errorMsg = validator.validateInput(formControlsCopy[controlName]);
    if (errorMsg) {
      formControlsCopy[controlName].error = errorMsg;
    }

    this.setState({
      formControls: formControlsCopy,
      formIsValid: validator.formIsValid(formControlsCopy)
    });
  };

  submit = e => {
    // if user has hit keyboard button "enter" from the form input, focus the element to check the validity of the input on blur
    //e.target.focus();

    if (this.state.formIsValid) {
      this.setState({ loading: true });

      this.props
        .onAuth(
          this.state.formControls.email.value.trim(),
          this.state.formControls.password.value
          // this.state.token
        )

        .then(response => {
          console.log("[Auth] Success", response);
          // if user is comming from an email and wasn't logged in we remebered his aimed location
          // in the 'redirect' query params, so after the successful login redirect him to that route
          const query = new URLSearchParams(this.props.location.search);
          const redirected = query.get("redirect");
          const history = this.props.history;
          history.push(redirected ? redirected : "/");
        })

        .catch(err => {
          console.log("[Auth] error", err);
          this.setState({ loading: false });
          this.props.snackbarAdd({
            message:
              err.response.data.error_description || err.response.data.message,
            type: "error",
            timeout: 8000
          });
        });
    } else {
      this.setState({
        formIsValid: validator.formIsValid(this.state.formControls)
      });
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.formControls) {
      const inputClasses = [];
      if (
        !this.state.formControls[key].valid &&
        this.state.formControls[key].touched
      ) {
        inputClasses.push(classes.Invalid);
      }

      formElementsArray.push({
        id: key,
        config: this.state.formControls[key],
        classes: inputClasses
      });
    }

    return (
      <div className={classes.Container}>
        <h1>Sign in</h1>
        <Card className={classes.AuthCard}>
          <Form onSubmit={this.submit}>
            <Input
              config={this.state.formControls.email}
              onChange={e => this.inputChangeHandler(e, "email")}
              onBlur={e => this.inputBlurHandler(e, "email")}
            />
            <Input
              config={this.state.formControls.password}
              onChange={e => this.inputChangeHandler(e, "password")}
              onBlur={e => this.inputBlurHandler(e, "password")}
            />

            <Button
              fullWidth={true}
              size="large"
              type="submit"
              disabled={this.state.loading || !this.state.formIsValid}
              loading={this.state.loading}
            >
              SIGN IN
            </Button>
          </Form>
        </Card>
        <div className={classes.NoAccountWrap}>
          <span>Don't have an account yet?</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user,
    token: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    snackbarAdd: snackConf => dispatch(actions.snackbarAdd(snackConf))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
