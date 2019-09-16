import React, { Component } from 'react';
import ReactSVG from 'react-svg';


import classes from './Tooltip.module.scss';
import IconClose from '../../../assets/images/icons/close icon.svg';



class Tooltip extends Component {
  state = {
		tooltipOpened: false,
	};

	closeTooltip = () => {
    this.setState({ tooltipOpened: false });
	};

	openTooltip = () => {
    this.setState({ tooltipOpened: true });
  };

  
  
  render() {
    return (
      
        <span >
          <span className={classes.TooltipWrap}>
            <span onClick={this.openTooltip}>
              {this.props.open}
            </span>
            { !this.state.tooltipOpened ? 
               ''
              : <div className={classes.Tooltip}>
                <span className={classes.Close} onClick={this.closeTooltip}>
                  <ReactSVG svgClassName={classes.IconClose} src={IconClose} />
                </span>
                {this.props.content}
                
              </div> }
          </span>
        </span>
    )
  }
}

export default Tooltip;