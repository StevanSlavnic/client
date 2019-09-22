import React, { Component } from "react";
import Search from "../Search/Search";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Search></Search>
      </div>
    );
  }
}

export default Homepage;
