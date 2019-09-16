import React from "react";

import Snackbar from "../Snackbar/Snackbar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import classes from "./Layout.module.scss";

class Layout extends React.PureComponent {
  render() {
    return (
      <div className={classes.LayoutRoot}>
        <Header>
          {/* snackbar is added to the header as it is leaner to handle it's positioning.
					 Becouse it dependes on the height of the Header element  */}
          <Snackbar />
        </Header>

        <div id="main_scroller" className={classes.Scroller}>
          {/* scrollable part of the app */}
          <div className={classes.MainWrap}>
            {/* central section */}
            <section className={classes.MainContainer}>
              <main className={classes.Main}>{this.props.children}</main>
            </section>
            {/* footer */}
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
