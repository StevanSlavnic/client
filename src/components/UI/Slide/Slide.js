import React from "react";

import classes from "./Slide.module.scss";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import * as screen from '../../../utils/common';




class IDSlide extends React.Component {
  state = {
    checked: false,
    bodyOverflow: 'auto'
  };

  render() {
    const props = this.props;
    const { checked } = this.state;

    this.handleSlideInChange = () => {
      this.setState({ checked: !this.state.checked });
    };

    return (
      <div className={classes.root} >
        <div className={classes.wrapper}>
          <span 
            checked={checked}
            onClick={this.handleSlideInChange}
            aria-label="Collapse"
          >
            {this.props.slideOpenIcon}
          </span>
          <Slide direction={props.slideTransition} in={checked} mountOnEnter unmountOnExit >
            <Paper elevation={4} className={[classes.Paper, props.className].join(' ')} style={{height: props.slideHeight}}>
              <div className={classes.SliderWrap}>
                <div className={classes.SlideHeadline} style={props.styles}>
                  <div>
                    {props.logo}
                  </div>
                  <div>
                    <span onClick={this.handleSlideInChange}>{props.closeIcon}</span>
                  </div>
                  <div>
                    {props.slideItemTitle}
                  </div>
                </div>
                <div className={classes.SlideItems}>
                  {props.slideItems}
                  <div onClick={this.handleSlideInChange}>{props.children}</div>
                </div>
              </div>
            </Paper>
          </Slide>
        </div>
      </div>
    );
  }
}


export default IDSlide;
