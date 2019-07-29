import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

import InputField from '../components/InputField'

export default function Login(props) {
  console.log('Login')
  const { auth, authService } = useContext(AuthContext)

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: '',
    password: ''
  })

  // const [errors, setErrors] = useState([])

  // const [errorMessage, setErrorMessage] = useState('')

  const { from } = props.location.state || {
    from: { pathname: '/' }
  }

  if (auth.isAuthenticated) {
    return <Redirect to={from} />
  }

  function onChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()

    // props.removeNotification()

    const userData = {
      usernameOrEmail: inputValues.usernameOrEmail,
      password: inputValues.password
    }

    authService.login(userData)
  }
  // componentDidUpdate(prevProps) {
  //   var error = props.error
  //   if (error !== prevProps.error) {
  //     if (error.errors) {
  //       this.setState({
  //         ...this.state,
  //         errors: error.errors,
  //         errorMessage: ''
  //       })
  //     }
  //     if (error.message) {
  //       this.setState({
  //         ...this.state,
  //         errors: [],
  //         errorMessage: error.message
  //       })
  //     }
  //   }

  return (
    <div className='Login mt-5 text-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4'>Log In</h1>
            <form className='mt-5' noValidate onSubmit={onSubmit}>
              <InputField
                placeholder='Username or Email Address'
                name='usernameOrEmail'
                type='text'
                value={inputValues.usernameOrEmail}
                onChange={onChange}
                error={
                  props.errors
                    ? props.errors.find(
                        error => error.field === 'usernameOrEmail'
                      )
                    : null
                }
              />

              <InputField
                placeholder='Password'
                name='password'
                type='password'
                value={inputValues.password}
                onChange={onChange}
                error={
                  props.errors
                    ? props.errors.find(error => error.field === 'password')
                    : null
                }
              />

              <input type='submit' className='btn btn-lg btn-light mt-5' />
            </form>
            <br />
            <Link className='nav-link' to='/register'>
              Don't have an account yet? Click here
            </Link>
          </div>
        </div>
        <br />
        {/* {props.errorMessage ? (
          <p className='lead text-danger'>{props.errorMessage}</p>
        ) : null}
        {props.notification.message ? (
          <p className='lead text-success'>{props.notification.message}</p>
        ) : null} */}
      </div>
    </div>
  )
}
