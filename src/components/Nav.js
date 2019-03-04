import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/todo'>
          TODO
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/schedule'>
                {' '}
                Schedule
              </Link>
            </li>
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
          {/* {isAuthenticated ? authLinks : guestLinks} */}
        </div>
      </nav>
    )
  }
}

export default Nav
