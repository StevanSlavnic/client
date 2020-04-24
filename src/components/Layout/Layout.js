import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import classes from './Layout.module.scss'

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={classes.LayoutRoot}>
        <Header />
        <div className={classes.MainWrap}>
          {/* central section */}
          <section className={classes.MainContainer}>
            <main className={classes.Main}>{this.props.children}</main>
          </section>
          {/* footer */}
          <Footer />
        </div>
      </div>
    )
  }
}

export default Layout
