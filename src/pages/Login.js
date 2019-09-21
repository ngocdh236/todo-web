import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

import InputField from '../components/InputField'

export default function Login(props) {
  const { auth, authService } = useContext(AuthContext)

  const { from } = props.location.state || {
    from: { pathname: '/' }
  }

  if (auth.isAuthenticated) {
    return <Redirect to={from} />
  }

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: '',
    password: ''
  })

  function onChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()

    const userData = {
      usernameOrEmail: inputValues.usernameOrEmail,
      password: inputValues.password
    }

    authService.login(userData)
  }

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
                  auth.inputErrors &&
                  auth.inputErrors.find(
                    error => error.field === 'usernameOrEmail'
                  )
                }
              />

              <InputField
                placeholder='Password'
                name='password'
                type='password'
                value={inputValues.password}
                onChange={onChange}
                error={
                  auth.inputErrors &&
                  auth.inputErrors.find(error => error.field === 'password')
                }
              />

              <input type='submit' className='btn btn-lg btn-light mt-5' />
            </form>
            <br />
            <span onClick={() => authService.removeErrors()}>
              <Link className='nav-link' to='/register'>
                Already have an account? Click here
              </Link>
            </span>
          </div>
        </div>
        <br />

        {auth.error && (
          <p className='lead text-danger text-center'>{auth.error}</p>
        )}
      </div>
    </div>
  )
}
