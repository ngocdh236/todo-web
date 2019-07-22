import './App.scss'

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'

import Nav from './components/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import MainTodo from './pages/MainTodo'
import MainCategory from './pages/MainCategory'
import MainSchedule from './pages/MainSchedule'
import { setAuthToken } from './services/setAuthToken'
import { setCurrentUser, logoutUser } from './services/authService'
import { setLightTheme, setDarkTheme } from './services/themeActions'
import { getTodos } from './services/todoService'
import { getCategories } from './services/categoryService'

if (localStorage.token) {
  setAuthToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(setCurrentUser(decoded))
  store.dispatch(getTodos())
  store.dispatch(getCategories())

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

switch (localStorage.getItem('theme')) {
  case 'Dark':
    store.dispatch(setDarkTheme())
    break
  default:
    store.dispatch(setLightTheme())
    break
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)

class App extends Component {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    store.getState().theme.darkMode
      ? store.dispatch(setLightTheme())
      : store.dispatch(setDarkTheme())
  }

  render() {
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

              <button id='button-mode' onClick={this.onClick}>
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
}

export default App
