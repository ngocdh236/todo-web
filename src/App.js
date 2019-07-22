import './App.scss'

import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'

import { AuthContext } from './contexts/AuthContext'
import Nav from './components/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import MainTodo from './pages/MainTodo'
import MainCategory from './pages/MainCategory'
import MainSchedule from './pages/MainSchedule'
import { setAuthToken } from './services/setAuthToken'
import { setLightTheme, setDarkTheme } from './services/themeActions'
import { getTodos } from './services/todoService'
import { getCategories } from './services/categoryService'

// switch (localStorage.getItem('theme')) {
//   case 'Dark':
//     store.dispatch(setDarkTheme())
//     break
//   default:
//     store.dispatch(setLightTheme())
//     break
// }

export default function App() {
  const { auth, dispatchAuth, authService } = useContext(AuthContext)
  let user
  const token = localStorage.token

  if (token) {
    setAuthToken(token)
    user = jwt_decode(token)

    const currentTime = Date.now() / 1000
    if (user.exp < currentTime) {
      authService.logoutUser()
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    dispatchAuth(authService.setCurrentUser(user))
    // store.dispatch(getTodos())
    // store.dispatch(getCategories())
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
    store.getState().theme.darkMode
      ? store.dispatch(setLightTheme())
      : store.dispatch(setDarkTheme())
  }

  return (
    <Provider store={store}>
      <Router>
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
            <PrivateRoute
              exact
              path='/category'
              basename='/category'
              component={MainCategory}
            />
            <PrivateRoute
              exact
              path='/schedule'
              basename='/schedule'
              component={MainSchedule}
            />

            <button id='button-mode' onClick={onClick}>
              {store.getState().theme.darkMode ? (
                <label>Light</label>
              ) : (
                <label>Dark</label>
              )}
            </button>
          </div>
        </div>
      </Router>
    </Provider>
  )
}
