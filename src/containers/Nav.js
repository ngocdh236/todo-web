import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../actions/authActions'

class Nav extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
      </ul>
    )

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/category'>
            Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/schedule'>
            Schedule
          </Link>
        </li>
        <li className='nav-item'>
          <label className='nav-link' onClick={this.onLogoutClick.bind(this)}>
            Logout
          </label>
        </li>
      </ul>
    )

    return (
      <nav className='Nav navbar navbar-expand-sm'>
        <Link className='navbar-brand' to='/'>
          TODO
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <i className='fas fa-bars' />
        </button>

        <div
          className='collapse navbar-collapse navbar-default'
          id='mobile-nav'
        >
          {isAuthenticated ? authLinks : guestLinks}
        </div>
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
