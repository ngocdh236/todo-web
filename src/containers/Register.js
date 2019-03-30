import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { registerUser } from '../actions/authActions'
import InputField from '../components/InputField'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      errors: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    this.props.registerUser(newUser, this.props.history)
  }

  componentDidUpdate(prevProps) {
    var error = this.props.error
    if (error !== prevProps.error) {
      if (error.errors) {
        this.setState({
          ...this.state,
          errors: error.errors,
          message: ''
        })
      }
      if (error.message) {
        this.setState({
          ...this.state,
          errorMessage: error.message,
          errors: []
        })
      }
    }
  }

  render() {
    var name = 'name'
    var username = 'username'
    var email = 'email'
    var password = 'password'
    var errors = this.state.errors

    return (
      <div className='Register mt-5 text-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4'>Sign Up</h1>
              <form className='mt-5' noValidate onSubmit={this.onSubmit}>
                <InputField
                  placeholder='Name'
                  name={name}
                  value={this.state.name}
                  onChange={this.onChange}
                  error={
                    errors ? errors.find(error => error.field === name) : null
                  }
                />

                <InputField
                  placeholder='Username'
                  name={username}
                  value={this.state.username}
                  onChange={this.onChange}
                  error={
                    errors
                      ? errors.find(error => error.field === username)
                      : null
                  }
                />

                <InputField
                  placeholder='Email Address'
                  name={email}
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={
                    errors ? errors.find(error => error.field === email) : null
                  }
                />

                <InputField
                  placeholder='Password'
                  name={password}
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={
                    errors
                      ? errors.find(error => error.field === password)
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
          {this.state.errorMessage ? (
            <p className='lead text-danger'>{this.state.errorMessage}</p>
          ) : null}
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
})

export default connect(
  mapStateToProps,
  { registerUser }
)(Register)
