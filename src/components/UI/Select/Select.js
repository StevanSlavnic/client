import React from 'react';
import Select from '@material-ui/core/NativeSelect';

import classes from './Select.module.scss';


function CustomSelect(props) {

	const { config, activetab } = props;
	// console.log('Select', props)

	const optionsRender = () => {
		return config.map((tab) => (
			// console.log(object)
			<React.Fragment>
  				<option className={[classes.Option, tab.value === activetab ? classes.OptionActive : ''].join(' ')} key={tab.value} value={tab.value} label={tab.label}>{tab.label}</option>
			</React.Fragment>
		));
	}

	const contentRender = () =>
		config.filter((tab) => {
			return activetab === tab.value;
		})[0];

	return (
		activetab &&
		<div className={classes.CustomSelectWrap}	>
			<Select		
				disableUnderline
				className={classes.CustomSelect}					
				onChange={(e, val) => props.onChangeOption(e, val)}
				value={activetab}
				>
				{optionsRender()}
			</Select>
			{contentRender() && contentRender().content}
		</div>
	);
}

export default React.memo(CustomSelect);
