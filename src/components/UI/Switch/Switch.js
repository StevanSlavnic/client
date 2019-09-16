import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwitchUI from '@material-ui/core/Switch';
import colors from '../../../sass/settings/_settings.colors.scss';

const styles = {
  colorSwitchBase: {
    color: colors['grey']
  },
  colorBar: {
    backgroundColor: colors['grey-light']
  }
};

const Switch = (props) => {
  const { classes } = props;
  return (
    <SwitchUI
    disabled={props.disabled}
    checked={props.checked}
    onChange={props.switchChanged}
    value={props.value}
    color="primary"
    classes={{
      switchBase: classes.colorSwitchBase,
      bar: classes.colorBar,
    }}
  />
  );
};

export default React.memo(withStyles(styles)(Switch));