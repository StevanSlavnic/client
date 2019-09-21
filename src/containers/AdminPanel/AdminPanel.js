import React, { Component } from "react";
import { connect } from "react-redux";
import { locationsFetchData } from "../../store/actions/locationActions";

import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import FormConfig from "./FormConfig/FormConfig";
import GooglePlaces from "./GooglePlaces/GooglePlaces";
import Location from "../../components/Location/Location";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
      results: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchData("http://127.0.0.1:8093/api/v1/locations");
    console.log(this.props.locations);
  }

  closeModal = () => {
    this.setState({ modalOpened: false });
  };

  openModal = () => {
    this.setState({ modalOpened: true });
  };

  callbackFunction = childData => {
    this.setState({ results: childData });
  };

  deleteLocation = e => {
    console.log(e.target.id);
  };

  render() {
    const locations = this.props.locations.locations
      ? this.props.locations.locations
      : [];

    console.log(locations);

    const passedFunction = a => {
      console.log(a);
    };

    const locationsRender = () =>
      locations.map(function(location) {
        return (
          <div key={location.id}>
            <Location
              location={location}
              passedFunction={passedFunction}
            ></Location>
          </div>
        );
      });

    return (
      <div>
        <h1>Admin panel</h1>
        <Button onClick={this.openModal}>Add Location</Button>
        <Modal open={this.state.modalOpened} onClose={this.closeModal}>
          <GooglePlaces parentCallback={this.callbackFunction} />
          <FormConfig results={this.state.results} />
        </Modal>

        <div>{locationsRender()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    isLoading: state.locationsAreLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(locationsFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
