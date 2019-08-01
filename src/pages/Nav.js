import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

export default function Nav() {
  const { auth, authService } = useContext(AuthContext)

  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <NavLink className='nav-link' activeClassName='a-active' to='/login'>
          Login
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' activeClassName='a-active' to='/register'>
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
        <label className='nav-link' onClick={authService.logout}>
          Logout
        </label>
      </li>
    </ul>
  )

  return (
    <nav className='Nav navbar navbar-expand-sm'>
      <NavLink exact className='navbar-brand' activeClassName='a-active' to='/'>
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

      <div className='collapse navbar-collapse navbar-default' id='mobile-nav'>
        {auth.isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  )
}
