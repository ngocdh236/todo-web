import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
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
          <NavLink className='nav-link' activeClassName='a-active' to='/login'>
            Login
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className='nav-link'
            activeClassName='a-active'
            to='/register'
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    )

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <NavLink
            exact
            className='nav-link'
            activeClassName='a-active'
            to='/category'
          >
            Category
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            exact
            className='nav-link'
            activeClassName='a-active'
            to='/schedule'
          >
            Schedule
          </NavLink>
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
        <NavLink
          exact
          className='navbar-brand'
          activeClassName='a-active'
          to='/'
        >
          TODO
        </NavLink>
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

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Nav)
)
