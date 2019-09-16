import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import moduleClasses from './ExpansionPanel.module.scss';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import color from '../../../sass/settings/_settings.colors.scss';

const styles = {
	root: {
		color: color.blue
	},
	expanded: {
    color: color.black,
	}
};

function IDExpansionPanel(props) {
	const { classes, activeBlack } = props;

	return (
		<div className={moduleClasses.ExpansionPanelWrap}>
			<ExpansionPanel
				className={[ moduleClasses.ExpansionPanel, props.className ].join(' ')}>
				<ExpansionPanelSummary
					classes={{ expanded: activeBlack ? classes.expanded : null, root: classes.root }}
					style={props.styles && props.styles.panelSummaryStyle}
					className={moduleClasses.ExpansionPanelSummary}
					expandIcon={
						<ArrowDropDown
							style={props.styles && props.styles.arrowStyle}
							className={moduleClasses.ArrowDropDown}
						/>
					}>
					<h2
						style={props.styles && props.styles.panelHeadlineStyle}
						className={moduleClasses.Heading}>
						{props.paneltitle} {props.icon}
					</h2>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails
					style={props.styles && props.styles.panelDetailsStyle}
					className={moduleClasses.ExpansionPanelDetails}>
					<div className={moduleClasses.InnerPanel}>{props.children}</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default withStyles(styles)(IDExpansionPanel);
