import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { locationsFetchData } from "../../store/actions/locationActions";
import * as locationService from "../../services/location/locationService";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: ""
    };
  }

  componentDidMount() {
    console.log(this.props.locations);
  }

  render() {
    const locations = this.state;

    console.log(locations.location);
    return (
      <div>
        <h1>Search places</h1>
        <Formik
          initialValues={{ keyword: "", city: "" }}
          onSubmit={(values, { setSubmitting }) => {
            locationService
              .getAllLocations(values.keyword, values.city)
              .then(response => this.setState({ location: response.data }));
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="keyword"
                placeholder="Search by any word"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <input
                type="text"
                name="city"
                placeholder="Search by city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>

        {/* <div>{locations && locations.map(location => location.title)}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    locations: state.locations
  };
};

const mapDispatchToProps = dispatch => {
  console.log(dispatch);
  return {
    fetchData: url => dispatch(locationsFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
