import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import classes from './Button.module.scss'

class ButtonUI extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    loading: PropTypes.string,
    children: PropTypes.string.isRequired,
    size: PropTypes.string,
    type: PropTypes.string,
    fullWidth: PropTypes.bool,
    noradius: PropTypes.string,
    active: PropTypes.string,
    nohover: PropTypes.bool
  }

  static defaultProps = {
    onClick: null,
    className: null,
    color: null,
    loading: null,
    fullWidth: false,
    size: 'small',
    noradius: null,
    active: '',
    nohover: null,
    disabled: null,
    type: null
  }

  render() {
    const style = {
      height: this.props.size === 'large' ? '50px' : '32px',
      width: this.props.fullWidth ? '100%' : 'auto',
      borderWidth: '2px'
    }

    const sharedProps = {
      ...this.props
    }

    const radiusClass = this.props.noradius ? classes.NoRadius : ''

    const inputBtnActiveClass = this.props.active ? classes.ButtonInputActive : ''

    const nohoverClass = this.props.nohover ? '' : classes['ButtonInput--icon_hover']

    const fontSizeClass = this.props.size === 'large' ? classes.FontLarge : ''

    const outline = () => (
      <Button
        onClick={e => (this.props.onClick ? this.props.onClick(e) : null)}
        style={style}
        disabled={this.props.disabled}
        {...sharedProps}
        className={[
          classes.ButtonBase,
          fontSizeClass,
          radiusClass,
          this.props.className
        ].join(' ')}
        variant='outlined'
        color={this.props.color ? this.props.color : 'primary'}
      >
        {this.props.loading ? progressLoader() : this.props.children}
      </Button>
    )

    const transparent = () => (
      <Button
        onClick={e => (this.props.onClick ? this.props.onClick(e) : null)}
        style={style}
        disabled={this.props.disabled}
        {...sharedProps}
        className={[
          classes.ButtonBase,
          classes.ButtonNormal,
          radiusClass,
          fontSizeClass,
          this.props.className
        ].join(' ')}
        variant='transparent'
        color={this.props.color ? this.props.color : 'transparent'}
      >
        {this.props.loading ? progressLoader() : this.props.children}
      </Button>
    )

    const normal = () => (
      <Button
        onClick={e => (this.props.onClick ? this.props.onClick(e) : null)}
        style={style}
        disabled={this.props.disabled}
        {...sharedProps}
        className={[
          classes.ButtonBase,
          classes.ButtonNormal,
          radiusClass,
          fontSizeClass,
          this.props.className
        ].join(' ')}
        variant='contained'
        color={this.props.color ? this.props.color : 'primary'}
      >
        {this.props.loading ? progressLoader() : this.props.children}
      </Button>
    )

    const input = () => (
      <Button
        onClick={e => (this.props.onClick ? this.props.onClick(e) : null)}
        style={style}
        disabled={this.props.disabled}
        {...sharedProps}
        className={[
          classes.ButtonBase,
          classes.ButtonInput,
          inputBtnActiveClass,
          nohoverClass,
          radiusClass,
          fontSizeClass,
          this.props.className
        ].join(' ')}
        variant='outlined'
        color={this.props.color ? this.props.color : 'primary'}
      >
        {this.props.loading ? progressLoader() : this.props.children}
      </Button>
    )

    const link = () => (
      <Button
        onClick={e => (this.props.onClick ? this.props.onClick(e) : null)}
        style={style}
        disabled={this.props.disabled}
        {...sharedProps}
        className={[
          classes.ButtonBase,
          classes.ButtonLink,
          fontSizeClass,
          this.props.className
        ].join(' ')}
        variant='outlined'
        color={this.props.color ? this.props.color : 'primary'}
      >
        {this.props.loading ? progressLoader() : this.props.children}
      </Button>
    )

    const progressLoader = () => {
      const size = this.props.size === 'large' ? '26px' : '22px'
      return (
        <CircularProgress
          className={classes.LoaderWrap}
          style={{ color: 'inherit', width: size, height: size }}
        />
      )
    }

    const buttonMarkup = () => {
      switch (this.props.type) {
        case 'outline':
          return outline()
        case 'transparent':
          return transparent()
        case 'input':
          return input()
        case 'link':
          return link()
        default:
          return normal()
      }
    }

    return (
      <Fragment>
        {buttonMarkup()}
      </Fragment>
    )
  }
}

export default ButtonUI
