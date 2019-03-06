import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Nav extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const guestLinks = (
      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              {' '}
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              {' '}
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    )

    const authLinks = (
      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/todo'>
              {' '}
              Todo
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/schedule'>
              {' '}
              Schedule
            </Link>
          </li>
          <li className='nav-item'>
            <label onClick={this.onLogoutClick.bind(this)} className='nav-link'>
              Logout
            </label>
          </li>
        </ul>
      </div>
    )

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>
          HOME
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon' />
        </button>

        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    )
  }
}

Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(Nav)
