import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import InputField from '../components/InputField'

export default function Register(props) {
  const { authService } = useContext(AuthContext)

  const [inputValues, setInputValues] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState('')
  const [inputErrors, setInputErrors] = useState([])

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
                  inputErrors
                    ? inputErrors.find(error => error.field === 'name')
                    : null
                }
              />

              <InputField
                placeholder='Username'
                name='username'
                value={inputValues.username}
                onChange={onChange}
                error={
                  inputErrors
                    ? inputErrors.find(error => error.field === 'username')
                    : null
                }
              />

              <InputField
                placeholder='Email Address'
                name='email'
                type='email'
                value={inputValues.email}
                onChange={onChange}
                error={
                  inputErrors
                    ? inputErrors.find(error => error.field === 'email')
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
                  inputErrors
                    ? inputErrors.find(error => error.field === 'password')
                    : null
                }
              />

              <input type='submit' className='btn btn-lg btn-light mt-5' />
            </form>
            <br />
            <Link className='nav-link' to='/login'>
              Already have an account? Click here
            </Link>
          </div>
        </div>
        <br />
        {hasError && <p className='lead text-danger text-center'>{error}</p>}
      </div>
    </div>
  )
}
