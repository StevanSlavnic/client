import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import classes from './Snackbar.module.scss';
import * as actions from './../../store/actions/indexActions';
class SnackbarCustom extends Component {
	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });

		setTimeout(() => {
			this.props.snackbarClose();
			this.setState({ open: true });
		}, 350);
	};

	render() {
		const snackbarData = this.props.snackbars.snackbars[0];

		const colorClass = () => {
			if (snackbarData.type === 'error') {
				return classes.SnackbarError;
			} else if (snackbarData.type === 'info') {
				return classes.SnackbarInfo;
			} else {
				return classes.SnackbarConfirm;
			}
		};

		return snackbarData ? (
			<Snackbar
				onClose={(e) => this.handleClose(e)}
				autoHideDuration={snackbarData.timeout || 10000}
				className={classes.Snackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={this.state.open}
				message={
					<span className={classes.Message}>
						{snackbarData.message || `Something went wrong`}
					</span>
				}
				action={
					<IconButton onClick={this.handleClose} className={classes.CloseButton}>
						<CloseIcon />
					</IconButton>
				}
				ContentProps={{
					className: [ classes.SnackbarContent, colorClass() ].join(' ')
				}}
			/>
		) : null;
	}
}

const mapStateToProps = (state) => {
	return {
		snackbars: state.snackbar
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		snackbarClose: () => dispatch(actions.snackbarClose())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarCustom);
