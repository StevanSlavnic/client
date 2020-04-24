import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { FormikTextField } from 'formik-material-fields'
import * as yup from 'yup'
import * as authService from '../../services/auth/authService'

import Card from '../../components/UI/Card/Card'
import Button from '../../components/UI/Button/Button'
import classes from './SignUp.module.scss'

const intialState = {
  username: '',
  email: '',
  password: ''
}
const userSchema = yup.object().shape({
  username: yup.string().required().max(60).min(2),
  email: yup.string().email().required(),
  password: yup.string().required().max(13).min(8)
})

function SignUp(props) {
  const [user, setUser] = useState(intialState)

  return (
    <div className={classes.SignUpWrap}>
      <Card>
        <h1>Register</h1>
        <Formik
          initialValues={user}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            setUser(values)
            authService
              .create(values)
              .then((response) => {
                setTimeout(() => {
                  const activationToken = response.data.user.activationToken
                  authService
                    .confirm(activationToken)
                    .then(() => {
                      props.history.push('/')
                    })
                    .catch((error) => {
                      console.log(error.data)
                    })
                }, 1000)
              })
              .catch((error) => {
                console.log(error.data)
                actions.setSubmitting(false)
              })
          }}
          validationSchema={userSchema}
        >
          {props => !props.isSubmitting && (
            <form onSubmit={props.handleSubmit}>
              <FormikTextField
                name='username'
                type='text'
                label='Username'
                margin='normal'
                onChange={props.handleChange}
                value={props.values.username}
                fullWidth
              />

              <FormikTextField
                name='email'
                type='email'
                label='Email'
                margin='normal'
                onChange={props.handleChange}
                value={props.values.email}
                fullWidth
              />

              <FormikTextField
                name='password'
                type='password'
                label='Password'
                margin='normal'
                onChange={props.handleChange}
                value={props.values.password}
                fullWidth
              />

              <div className={classes.SignUpButton}>
                <Button
                  type='submit'
                  disabled={
                    !props.dirty && props.isSubmitting
                }
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired
}

export default SignUp
