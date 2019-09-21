import React, { Component } from "react";
/* global window.google */
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import apiConf from "../../../utils/apiConfig";

import { Input } from "@material-ui/core";

// const google = (window.google = window.google ? window.google : {});

const MY_API_KEY = apiConf.MAP_APY_KEY;
const google = window && window.google;

class GoogleSuggest extends Component {
  state = {
    search: "",
    value: "",
    result: ""
  };

  componentDidMount() {
    // console.log(google);
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction.address_components, originalPrediction); // eslint-disable-line
    this.setState({
      search: "",
      value: geocodedPrediction.formatted_address,
      result: geocodedPrediction
    });
    if (geocodedPrediction) {
      this.sendData();
      this.placeToAddress();
    }
  };

  placeToAddress = () => {
    const address = {};

    this.state.result.address_components.forEach(function(c) {
      switch (c.types[0]) {
        case "street_number":
          address.streetNumber = c;
          break;
        case "route":
          address.streetName = c;
          break;
        case "locality": // North Hollywood or Los Angeles?
          address.city = c;
          break;
        case "postal_code":
          address.zip = c;
          break;
        case "administrative_area_level_1": //  Note some countries don't have states
          address.administrativeArea = c;
          break;
        case "state_r":
          address.state = c;
          break;
        case "country":
          address.country = c;
          break;
        /*
         *   . . .
         */
      }
    });
    // console.log(address);
    return address;
  };

  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  handleStatusUpdate = status => {
    console.log("status", status);
  };

  sendData = () => {
    const result = this.placeToAddress();
    this.props.parentCallback(result);
  };

  render() {
    const { search, value } = this.state;
    return (
      <ReactGoogleMapLoader
        params={{
          key: MY_API_KEY,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search
              }}
              onNoResult={this.handleNoResult}
              onSelectSuggest={this.handleSelectSuggest}
              onStatusUpdate={this.handleStatusUpdate}
              textNoResults="My custom no results text"
              customRender={prediction => (
                <div className="customWrapper">
                  {prediction
                    ? prediction.description
                    : "My custom no results text"}
                </div>
              )}
            >
              <Input
                type="text"
                value={value}
                placeholder="Search a location"
                onChange={this.handleInputChange}
              />
            </ReactGooglePlacesSuggest>
          )
        }
      />
    );
  }
}
export default GoogleSuggest;
