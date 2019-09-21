import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import _ from "lodash";
import * as locationService from "../../../services/location/locationService";

import Button from "../../../components/UI/Button/Button";

class FormConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      address: "",
      street_number: "",
      city: "",
      state: "",
      country: "",
      zip_code: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextPropsCopy = nextProps;

    this.setState({
      address: _.has(nextPropsCopy.results, "streetName")
        ? nextPropsCopy.results.streetName.long_name
        : "",
      street_number: _.has(nextPropsCopy.results, "streetNumber")
        ? nextPropsCopy.results.streetNumber.long_name
        : "",
      city: _.has(nextPropsCopy.results, "city")
        ? nextPropsCopy.results.city.long_name
        : "",
      state: _.has(nextPropsCopy.results, "state" || "administrativeArea")
        ? nextPropsCopy.results.administrativeArea.long_name ||
          nextPropsCopy.results.state_r.long_name
        : "",
      country: _.has(nextPropsCopy.results, "country")
        ? nextPropsCopy.results.country.long_name
        : "",
      zip_code: _.has(nextPropsCopy.results, "zip")
        ? nextPropsCopy.results.zip.long_name
        : ""
    });
    console.log("componentWillReceiveProps", nextPropsCopy.results);
  }

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={this.state}
        // validate={validate(validationSchema)}
        // onSubmit={onSubmit}
        onSubmit={(values, { setSubmitting }) => {
          locationService.createLocation(values);
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        validate={values => {
          let errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.street_number) {
            errors.street_number = "Required";
          }
          if (!values.city) {
            errors.city = "Required";
          }
          if (!values.state) {
            errors.state = "Required";
          }
          if (!values.country) {
            errors.country = "Required";
          }
          if (!values.zip_code) {
            errors.zip_code = "Required";
          }

          return errors;
        }}
        render={({
          values,
          errors,
          touched,
          status,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          handleReset,
          setTouched
        }) => (
          <Form>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />

            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />

            <Field type="text" name="address" />
            <ErrorMessage name="address" component="div" />

            <Field type="text" name="street_number" />
            <ErrorMessage name="street_number" component="div" />

            <Field type="text" name="city" />
            <ErrorMessage name="city" component="div" />

            <Field type="text" name="state" />
            <ErrorMessage name="state" component="div" />

            <Field type="text" name="country" />
            <ErrorMessage name="country" component="div" />

            <Field type="text" name="zip_code" />
            <ErrorMessage name="zip_code" component="div" />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      />
    );
  }
}

export default FormConfig;
