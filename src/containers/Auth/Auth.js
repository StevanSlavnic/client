import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import * as authService from "../../services/auth/authService";
import * as actions from "../../store/actions/indexActions";

import { Formik, Field } from "formik";
import { FormikTextField } from "formik-material-fields";
import Button from "./../../components/UI/Button/Button";
import Card from "./../../components/UI/Card/Card";
import * as yup from "yup";
import classes from "./Auth.module.scss";

const intialState = {
  email: "",
  password: ""
};

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .max(13)
    .min(8)
});

function AuthForm(props) {
  const [user, setUser] = useState(intialState);

  console.log(props);

  return (
    <div className={classes.AuthWrap}>
      <Card>
        <h1>Log in</h1>
        <Formik
          initialValues={user}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            setUser(values);
            authService.login(values);
            props
              .onAuth(values.email, values.password)

              .then(response => {
                console.log("[Auth] Success", response);
              })

              .catch(err => {
                console.log("[Auth] error", err);
              });

            setTimeout(() => {
              actions.setSubmitting(false);
            }, 2000);
          }}
          validationSchema={userSchema}
        >
          {props =>
            !props.isSubmitting ? (
              <form onSubmit={props.handleSubmit}>
                <FormikTextField
                  name="email"
                  type="email"
                  label="Email"
                  onChange={props.handleChange}
                  value={props.values.email}
                  fullWidth
                />

                <FormikTextField
                  name="password"
                  type="password"
                  label="Password"
                  onChange={props.handleChange}
                  value={props.values.password}
                  fullWidth
                />

                <div className={classes.AuthButton}>
                  <Button
                    type="submit"
                    disabled={!props.dirty && props.isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            ) : (
              <div />
            )
          }
        </Formik>
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user,
    token: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
