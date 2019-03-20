import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import InputField from '../common/InputField'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      usernameOrEmail: '',
      password: '',
      errors: {}
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

  render() {
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
                  name='usernameOrEmail'
                  type='text'
                  value={this.state.usernameOrEmail}
                  onChange={this.onChange}
                />

                <InputField
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                />

                <input type='submit' className='btn btn-lg btn-light mt-5' />
              </form>
              <br />
              
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
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login))
