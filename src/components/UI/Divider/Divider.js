import React from 'react';
import classes from './Divider.module.scss';
// accepts 'horizontal' prop for secondary type of alignment default is vertical
function Divider(props) {
	return <div {...props} className={[ classes.Divider, props.horizontal ? classes.DividerHorizontal : classes.DividerVertical, props.className ].join(' ')} />;
}

export default Divider;
