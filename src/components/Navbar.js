import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>
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
              <Link className='nav-link' to='/profiles'>
                {' '}
                Schedule
              </Link>
            </li>
          </ul>
          {/* {isAuthenticated ? authLinks : guestLinks} */}
        </div>
      </nav>
    )
  }
}

export default Navbar
