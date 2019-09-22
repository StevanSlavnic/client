import React, { useState, Fragment, useEffect } from "react";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import * as authService from "../../services/auth/authService";

import classes from "./Auth.module.scss";
import * as actions from "../../store/actions/indexActions";

// import s from "./app.component.css";

const intialState = {
  email: "",
  password: ""
};
// const userSchema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup
//     .string()
//     .email()
//     .required(),
//   password: yup
//     .string()
//     .required()
//     .max(13)
//     .min(8)
// });
function AuthForm(props) {
  const [user, setUser] = useState(intialState);

  console.log(props);

  return (
    <Fragment>
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
              // this.setState({ loading: false });
            });

          setTimeout(() => {
            actions.setSubmitting(false);
          }, 2000);
        }}
        // validationSchema={userSchema}
      >
        {props =>
          !props.isSubmitting ? (
            <form
              onSubmit={props.handleSubmit}
              // className={s.form}
            >
              <Field
                type="email"
                placeholder="Enter email"
                onChange={props.handleChange}
                name="email"
                value={props.values.email}
                // className={s.text_field}
              />

              {props.errors.email && props.touched.email ? (
                <span
                // className={s.field_text}
                >
                  {props.errors.email}
                </span>
              ) : (
                ""
              )}

              <Field
                type="password"
                onChange={props.handleChange}
                name="password"
                value={props.values.password}
                placeholder="Password"
                // className={s.text_field}
              />

              {props.errors.password && props.touched.password ? (
                <span
                // className={s.field_text}
                >
                  {props.errors.password}
                </span>
              ) : (
                ""
              )}

              {props.errors.name && props.touched.name ? (
                <span
                // className={s.field_text}
                >
                  {props.errors.name}
                </span>
              ) : (
                ""
              )}
              <button
                type="submit"
                disabled={!props.dirty && props.isSubmitting}
                // className={`${s.button} ${s.submit_button}`}
              >
                Submit
              </button>
            </form>
          ) : (
            <div
            // className={s.overlay}
            />
          )
        }
      </Formik>
    </Fragment>
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
