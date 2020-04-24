import React from 'react'
import PropTypes from 'prop-types'
import classes from './Card.module.scss'

const Card = (props) => {
  const ribbonColorClass = props.color ? classes[`Card--${props.color}`] : ''
  return (
    <div
      {...props}
      className={[props.className, ribbonColorClass, classes.Card].join(' ')}
    >
      {props.children}
    </div>
  )
}

Card.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
}

Card.defaultProps = {
  color: null,
  className: null
}

export default Card
