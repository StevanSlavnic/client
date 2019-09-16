import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import classes from './Tabs.module.scss';

const styles = {
	indicator: {
		backgroundColor: '#1890ff'
	}
};
function CustomTabs(props) {
	const { config, activetab } = props;
	console.log('Tabs', props)

	const tabsListRender = () => {
		return config.map((tab) => (
			// console.log(tab)
			<Tab className={[classes.Tab, tab.value === activetab ? classes.TabActive : ''].join(' ')} key={tab.value} value={tab.value} label={tab.label} />
		));
	}

	const tabsContentRender = () =>
		config.filter((tab) => {
			return activetab === tab.value;
		})[0].content;

	return (
		activetab &&
		<div className={[ props.className, classes.Container ].join(' ')}>
					<AppBar className={classes.Header} position="static">
						<Tabs
							className={classes.Tabs}
							onChange={(e, val) => props.onChangeTab(e, val)}
							value={activetab}
							indicatorColor="primary"
							classes={{ indicator: classes.Indicator }}
							>
							{tabsListRender()}
						</Tabs>
					</AppBar>
					{tabsContentRender()}
		</div>
	);
}

export default React.memo(withStyles(styles)(CustomTabs));
