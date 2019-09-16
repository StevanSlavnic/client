import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import IconAvatar from '../../../assets/images/icons/user icon.svg';
import classes from './Avatar.module.scss';
import apiConfig from '../../../utils/apiConfig';

const AvatarCustom = (props) => {
	const size = props.size ? props.size+'px' : '35px'

	const style = {height: size, width: size ,...props.style};

	const avatar = () => (
		<Avatar style={style} className={[classes.Avatar, props.className].join(' ')} src={apiConfig.DOMAIN_IMAGE + props.src} alt="user avatar" />
	);
	const avatarGeneric = () => (
		<Avatar style={style} className={[classes.Avatar, classes['Avatar--generic'], props.className].join(' ')} src={IconAvatar} alt="user avatar" />
	);

	return props.src ? avatar() : avatarGeneric();
};
export default React.memo(AvatarCustom);
