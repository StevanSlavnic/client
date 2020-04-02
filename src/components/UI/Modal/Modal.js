import React from 'react'
import PropTypes from 'prop-types'
import ModalUI from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Delete from '../../../assets/images/icons/close_icon.svg'
import Card from '../Card/Card'
import classes from './Modal.module.scss'

const Modal = props => (
  <ModalUI
    {...props}
    className={classes.Modal}
    open={props.open}
    onClose={() => {
      props.onClose()
    }}
  >
    <Card className={[classes.Card, props.className].join(' ')}>
      <IconButton className={classes.CloseButton} onClick={props.onClose}>
        <img className={classes.Icon} src={Delete} alt='X mark' />
      </IconButton>
      {props.children}
    </Card>
  </ModalUI>
)

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.array.isRequired
}

Modal.defaultProps = {
  className: null
}

export default Modal
