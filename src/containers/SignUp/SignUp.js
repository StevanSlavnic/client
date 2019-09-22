import React, { useState, Fragment, useEffect } from "react";
import { Formik, Field } from "formik";
import * as authService from "../../services/auth/authService";
import * as yup from "yup";

const intialState = {
  username: "",
  email: "",
  password: ""
};
const userSchema = yup.object().shape({
  username: yup.string().required(),
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
    <Fragment>
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
          console.log(user);
        }}
        validationSchema={userSchema}
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
              <Field
                name="username"
                onChange={props.handleChange}
                value={props.values.username}
                type="text"
                placeholder="Username"
                // className={s.text_field}
              />
              {props.errors.username && props.touched.username ? (
                <span
                // className={s.field_text}
                >
                  {props.errors.username}
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

export default SignUp;
