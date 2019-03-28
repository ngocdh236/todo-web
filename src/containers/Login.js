import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { loginUser } from '../actions/authActions'
import InputField from '../components/InputField'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      usernameOrEmail: '',
      password: '',
      errors: [],
      errorMessage: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const userData = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  componentDidUpdate(prevProps) {
    var error = this.props.error
    if (error !== prevProps.error) {
      if (error.errors) {
        this.setState({
          ...this.state,
          errors: error.errors
        })
      }
      if (error.message) {
        this.setState({
          ...this.state,
          errorMessage: error.message
        })
      }
    }
  }

  render() {
    var usernameOrEmail = 'usernameOrEmail'
    var password = 'password'
    var errors = this.state.errors
    return (
      <div className='Login mt-5 text-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4'>Log In</h1>
              <form className='mt-5' noValidate onSubmit={this.onSubmit}>
                <InputField
                  placeholder='Username or Email Address'
                  name={usernameOrEmail}
                  type='text'
                  value={this.state.usernameOrEmail}
                  onChange={this.onChange}
                  error={
                    errors
                      ? errors.find(error => error.field === usernameOrEmail)
                      : null
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
              <Link className='nav-link' to='/register'>
                Don't have an account yet? Click here
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login))
