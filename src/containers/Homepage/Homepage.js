import React, { Component } from "react";
import { connect } from "react-redux";
import { locationsFetchData } from "../../store/actions/locationActions";
import * as locationService from "../../services/location/locationService";
import Search from "../Search/Search";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchData("http://127.0.0.1:8093/api/v1/locations");
  }

  render() {
    return (
      <div>
        <Search></Search>
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
)(Homepage);
