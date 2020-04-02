import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup'

import { FormikTextField } from 'formik-material-fields'
import * as actions from '../../store/actions/indexActions'
import * as authService from '../../services/auth/authService'
import Button from '../../components/UI/Button/Button'
import Card from '../../components/UI/Card/Card'
import classes from './Auth.module.scss'

const intialState = {
  email: '',
  password: ''
}

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .max(13)
    .min(8)
})

function AuthForm(props) {
  const [user, setUser] = useState(intialState)

  return (
    <div className={classes.AuthWrap}>
      <Card>
        <h1>Log in</h1>
        <Formik
          initialValues={user}
          onSubmit={(values, action) => {
            action.setSubmitting(true)
            setUser(values)
            authService.login(values)
            props
              .onAuth(values.email, values.password)

              .then((response) => {
                console.log('[Auth] Success', response)
              })

              .catch((err) => {
                console.log('[Auth] error', err)
              })

            setTimeout(() => {
              action.setSubmitting(false)
            }, 2000)
          }}
          validationSchema={userSchema}
        >
          {props => (!props.isSubmitting ? (
            <form onSubmit={props.handleSubmit}>
              <FormikTextField
                name='email'
                type='email'
                label='Email'
                onChange={props.handleChange}
                value={props.values.email}
                fullWidth
              />

              <FormikTextField
                name='password'
                type='password'
                label='Password'
                onChange={props.handleChange}
                value={props.values.password}
                fullWidth
              />

              <div className={classes.AuthButton}>
                <Button
                  type='submit'
                  disabled={!props.dirty && props.isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <div />
          ))
          }
        </Formik>
      </Card>
    </div>
  )
}

AuthForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  userData: state.user,
  token: state.auth.accessToken
})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.auth(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm)
