import React, { Component } from "react";
import { locationsFetchData } from "../../store/actions/locationActions";
import { connect } from "react-redux";
import * as locationService from "../../services/location/locationService";

class Search extends Component {
  state = {
    searchQuery: "",
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    const searchQuery = event.target.value;

    // const searchQuery = e.target.value;

    this.fetchLocation(searchQuery);

    this.setState({
      searchQuery: searchQuery
    });
  };

  fetchLocation = searchQuery => {
    console.log(this.state.guery);

    console.log(this.state.data);

    const locations = this.state.data;
    const location = locations.filter(location =>
      // console.log(location)
      location.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({
      filteredData: location
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    console.log(this.props);

    this.setState({
      data: this.props.locations.locations ? this.props.locations.locations : []
    });
  }

  render() {
    // console.log(this.state.data);

    const locations = this.props.locations.locations
      ? this.props.locations.locations
      : [];

    console.log("filtered", this.state.filteredData);

    console.log(locations);
    return (
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </form>
        <div>
          {this.state.filteredData.map(i => (
            <p>{i.title}</p>
          ))}
        </div>
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
)(Search);
