import React, { Component } from "react";
import { connect } from "react-redux";
import {
  locationsFetchData,
  locationsFetchDataFiltered
} from "../../store/actions/locationActions";
import * as locationService from "../../services/location/locationService";
import { Formik } from "formik";
import { FormikTextField } from "formik-material-fields";

import Location from "../../components/Location/Location";
import Button from "../../components/UI/Button/Button";
import classes from "./Homepage.module.scss";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: ""
    };

    console.log(props);
  }

  componentDidMount() {
    this.props.fetchData("http://127.0.0.1:8093/api/v1/locations");
  }

  render() {
    const {
      locations: { locations }
    } = this.props;

    console.log(this.props.locations);

    const locationsRender =
      locations &&
      locations.map(location => {
        return (
          <div className={classes.LocationHomeColumn} key={location.id}>
            <Location
              className={classes.LocationHomeCard}
              isAdmin={this.props.match.url}
              id={location.id}
              location={location}
            ></Location>
          </div>
        );
      });

    return (
      <div className={classes.HomePageWrap}>
        <h1>Search places</h1>
        <div className={classes.FormWrap}>
          <Formik
            initialValues={{ keyword: "", city: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                locationService
                  .getAllLocations(values.keyword, values.city)
                  .then(response => {
                    const locations = response.data;
                    console.log(values);
                    this.props.fetchDataFiltered(locations);
                  });
              }, 600);
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
                <FormikTextField
                  type="text"
                  name="keyword"
                  placeholder="Search by any word"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.keyword}
                  className={classes.HomePageFormField}
                />

                <FormikTextField
                  type="text"
                  name="city"
                  placeholder="Search by city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  className={classes.HomePageFormField}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.HomePageFormButton}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <div className={classes.LocationsHomeWrap}>
          <div className={classes.LocationsHomeRow}>{locationsRender}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    locationsFiltered: state.locationsFiltered,
    loggedUser: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(locationsFetchData(url)),
    fetchDataFiltered: locations =>
      dispatch(locationsFetchDataFiltered(locations))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
