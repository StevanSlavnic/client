import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import clone from 'lodash.clonedeep';
import IconCamera from '@material-ui/icons/PhotoCamera';

import Avatar from './../../../components/UI/Avatar/Avatar';
import classes from './PhotoUpload.module.scss';
import { uploadProfilePhoto } from './../../../services/user/userService';
import * as actions from '../../../store/actions/indexActions';

class PhotoUpload extends Component {
	state = {
		loading: false
	};
	onChange = (e) => {
		let file = e.target.files[0];

		if (this.validImage(e, file)) {
			this.setState({ loading: true });

			// upload call to api
			uploadProfilePhoto(this.props.token, file)
				.then((response) => {
					this.setState({ loading: false });
					console.log(response.data);

					this.updateStore(response);
				})
				.catch((err) => {
					console.log(err.response.data);
					this.setState({ loading: false });
					this.showError(err.response.data && err.response.data.message);
				});
		}
	};

	updateStore = (response) => {
		const newUserData = clone(this.props.userData);
		// copy the new profile data to the clone of the current user data
		newUserData.profile = response.data;

		this.props.updateLoggedUser(newUserData);
	};

	validImage = (e, file) => {
		const fileFormats = [ 'image/jpg', 'image/jpeg', 'image/png', 'image/x-png' ];
		console.log(e.target);

		// frontend validation of uploaded file
		if (file) {
			// validation for size, return the function if rule is not applied
			let errorMessage = '';
			if (file.size > 20 * 1024 * 1024) {
				errorMessage = 'This file is too big. Please upload a file up to 20MB.';
			} else if (!fileFormats.includes(file.type)) {
				// validation for type, return the function if rule is not applied
				errorMessage = `Please upload one of the following formats 'JPG', 'JPEG', 'PNG'.`;
			}

			if (errorMessage) {
				this.showError(errorMessage);
				return false;
			} else {
				return true;
			}
		}
	};

	showError = (message) => {
		this.props.snackbarAdd({
			message: message,
			type: 'error',
			timeout: 8000
		});
	};

	onClickUpload = (e) => {
		if (this.state.loading) {
			e.preventDefault();
		}
	};

	render() {
		return (
			<div>
				<input
					onChange={(e) => this.onChange(e)}
					style={{ display: 'none' }}
					accept="image/*"
					id="upload-photo"
					multiple
					type="file"
				/>
				<label htmlFor="upload-photo" onClick={(e) => this.onClickUpload(e)}>
					<IconButton style={{ position: 'relative' }} component="span">
						<Avatar
							src={
								this.props.userData.profile.photo && this.props.userData.profile.photo.big
							}
							className={classes.Avatar}
							size="140"
						/>
						<span className={classes.IconCamera}>
							<IconCamera />
						</span>

						{/* Loader */
						this.state.loading ? (
							<div className={classes.Loader}>
								<CircularProgress thickness="1" />
							</div>
						) : null}
					</IconButton>
				</label>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userData: state.user,
		token: state.auth.accessToken
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		snackbarAdd: (snackConf) => dispatch(actions.snackbarAdd(snackConf)),
		updateLoggedUser: (userData) => dispatch(actions.getLoggedUser(userData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUpload);
