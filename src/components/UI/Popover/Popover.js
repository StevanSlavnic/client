import React from 'react';
import ReactSVG from 'react-svg';


import classes from './Popover.module.scss';
// import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import IconClose from '../../../assets/images/icons/close icon.svg';
import IconArrow from '../../../assets/images/icons/arrow_down_white_icon.svg';
import * as screen from './../../../utils/common';




class IDPopover extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    screen: null,
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    // const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    // const screen = screen.mq();

    

    return (
      <div>
        <span
          className={classes.Anchor}
          aria-describedby={id} 
          variant="contained" 

          onClick={this.handleClick}

          onMouseEnter={this.handleClick}
          onMouseLeave={this.handleClose}
        >
          {this.props.open}
        </span>
        <Popper  
          id={id} 
          open={open} 
          anchorEl={anchorEl} 
          transition
          placement="top"
          className={classes.Popover}
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: false,
              boundariesElement: 'scrollParent',
            }
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={0}>
              <Paper className={classes.Paper}>
              <span className={classes.Close} anchorEl={anchorEl} onClick={this.handleClick}>
                  <ReactSVG svgClassName={classes.IconClose} src={IconClose} />
              </span>
              {this.props.content}
              </Paper>
            </Fade>
          )}
          
        </Popper>
      </div>
    );
  }
}

// IDPopover.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default IDPopover;