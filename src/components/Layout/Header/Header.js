import React, { Component } from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        Header
        <Link to="/auth">Login</Link>
      </div>
    );
  }
}

export default Header;
