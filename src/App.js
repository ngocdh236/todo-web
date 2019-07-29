import './App.scss'

import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { ThemeContext } from './contexts/ThemeContext'
import { AuthContext } from './contexts/AuthContext'
import Nav from './components/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import MainTodo from './pages/MainTodo'

// import MainCategory from './pages/MainCategory'
// import MainSchedule from './pages/MainSchedule'
import { setAuthToken } from './services/setAuthToken'

export default function App() {
  const { theme, setLightTheme, setDarkTheme } = useContext(ThemeContext)
  const { auth, authService } = useContext(AuthContext)

  console.log('App')

  let user
  const token = localStorage.token

  if (token) {
    setAuthToken(token)
    user = jwt_decode(token)

    const currentTime = Date.now() / 1000
    if (user.exp < currentTime) {
      authService.logout()
    }
  }

  useEffect(() => {
    switch (localStorage.getItem('theme')) {
      case 'Dark':
        setDarkTheme()
        break
      default:
        setLightTheme()
    }
    authService.setUser(user)
  }, [])

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )

  const onClick = () => {
    theme.darkMode ? setLightTheme() : setDarkTheme()
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />
        <div className='px-5'>
          <Route
            exact
            path='/register'
            basename='/register'
            component={Register}
          />
          <Route exact path='/login' basename='/login' component={Login} />
          <PrivateRoute exact path='/' basename='/' component={MainTodo} />
          {/* <PrivateRoute
              exact
              path='/category'
              basename='/category'
              component={MainCategory}
            /> */}
          {/* <PrivateRoute
              exact
              path='/schedule'
              basename='/schedule'
              component={MainSchedule}
            /> */}

          <button id='button-mode' onClick={onClick}>
            {theme.darkMode ? <label>Light</label> : <label>Dark</label>}
          </button>
        </div>
      </div>
    </BrowserRouter>
  )
}
