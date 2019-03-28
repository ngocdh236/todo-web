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
      errors: []
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
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        ...this.state,
        errors: this.props.errors
      })
    }
  }

  render() {
    var usernameOrEmail = 'usernameOrEmail'
    var password = 'password'
    return (
      <div className='Login mt-5 text-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4'>Log In</h1>
              <p className='lead'>Login to your bla bla bla account</p>
              <form className='mt-5' noValidate onSubmit={this.onSubmit}>
                <InputField
                  placeholder='Username or Email Address'
                  name={usernameOrEmail}
                  type='text'
                  value={this.state.usernameOrEmail}
                  onChange={this.onChange}
                  error={this.state.errors.find(
                    error => error.field === usernameOrEmail
                  )}
                />

                <InputField
                  placeholder='Password'
                  name={password}
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={this.state.errors.find(
                    error => error.field === password
                  )}
                />

                <input type='submit' className='btn btn-lg btn-light mt-5' />
              </form>
              <br />
              <Link className='nav-link' to='/register'>
                Don't have an account yet? Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login))
