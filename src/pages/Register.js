import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import InputField from '../components/InputField'

export default function Register(props) {
  const { auth, authService } = useContext(AuthContext)

  const [inputValues, setInputValues] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const onChange = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: inputValues.name,
      username: inputValues.username,
      email: inputValues.email,
      password: inputValues.password
    }

    authService.register(newUser, props.history)
  }

  return (
    <div className='Register mt-5 text-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4'>Sign Up</h1>
            <form className='mt-5' noValidate onSubmit={onSubmit}>
              <InputField
                placeholder='Name'
                name='name'
                value={inputValues.name}
                onChange={onChange}
                error={
                  auth.inputErrors &&
                  auth.inputErrors.find(error => error.field === 'name')
                }
              />

              <InputField
                placeholder='Username'
                name='username'
                value={inputValues.username}
                onChange={onChange}
                error={
                  auth.inputErrors &&
                  auth.inputErrors.find(error => error.field === 'username')
                }
              />

              <InputField
                placeholder='Email Address'
                name='email'
                type='email'
                value={inputValues.email}
                onChange={onChange}
                error={
                  auth.inputErrors &&
                  auth.inputErrors.find(error => error.field === 'email')
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
              <Link className='nav-link' to='/login'>
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
