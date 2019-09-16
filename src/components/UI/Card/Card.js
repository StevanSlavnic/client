import React from 'react';
import classes from './Card.module.scss';

function Card(props) {
	const loadClass = props.loading ? classes.CardLoading : '';
	const noRibbonClass = props.noribbon ? classes.NoRibbon : '';
	const ribbonColorClass = props.color ? classes[`Card--${props.color}`] : '';
	return (
		<div {...props} className={[ props.className, loadClass, ribbonColorClass, noRibbonClass, classes.Card ].join(' ')}>
			{props.children}
		</div>
	);
}

export default React.memo(Card);
