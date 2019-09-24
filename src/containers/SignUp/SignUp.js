import React, { useState, Fragment, useEffect } from "react";
import { Formik, Field } from "formik";
import * as authService from "../../services/auth/authService";
import { FormikTextField } from "formik-material-fields";
import Card from "./../../components/UI/Card/Card";
import Button from "./../../components/UI/Button/Button";
import * as yup from "yup";
import classes from "./SignUp.module.scss";

const intialState = {
  username: "",
  email: "",
  password: ""
};
const userSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .max(60)
    .min(2),
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

function SignUp(props) {
  const [user, setUser] = useState(intialState);
  return (
    <div className={classes.SignUpWrap}>
      <Card>
        <h1>Sign Up</h1>
        <Formik
          initialValues={user}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            setUser(values);
            authService
              .create(values)
              .then(response => {
                console.log(response.data);
                setTimeout(() => {
                  const activationToken = response.data.user.activationToken;
                  authService
                    .confirm(activationToken)
                    .then(response => {
                      console.log(response.data);
                      props.history.push("/");
                    })
                    .catch(error => {
                      console.log(error.data);
                    });
                }, 1000);
              })
              .catch(error => {
                console.log(error.data);
              });
          }}
          validationSchema={userSchema}
        >
          {props =>
            !props.isSubmitting ? (
              <form onSubmit={props.handleSubmit}>
                <FormikTextField
                  name="username"
                  type="text"
                  label="Username"
                  margin="normal"
                  onChange={props.handleChange}
                  value={props.values.username}
                  fullWidth
                />

                <FormikTextField
                  name="email"
                  type="email"
                  label="Email"
                  margin="normal"
                  onChange={props.handleChange}
                  value={props.values.email}
                  fullWidth
                />

                <FormikTextField
                  name="password"
                  type="password"
                  label="Password"
                  margin="normal"
                  onChange={props.handleChange}
                  value={props.values.password}
                  fullWidth
                />

                <div className={classes.SignUpButton}>
                  <Button
                    type="submit"
                    disabled={!props.dirty && props.isSubmitting}
                    // className={classes.SignUpButton}
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

export default SignUp;
