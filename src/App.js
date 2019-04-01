import './App.scss'

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'

import Nav from './containers/Nav'
import Register from './containers/Register'
import Login from './containers/Login'
import MainTodo from './components/MainTodo'
import MainCategory from './containers/MainCategory'
// import MainSchedule from './containers/MainSchedule'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { setLightTheme, setDarkTheme } from './actions/themeActions'
import { getTodos } from './actions/todoActions'
import { getCategories } from './actions/categoryActions'

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

    this.state = {
      theme: localStorage.theme,
      darkMode: localStorage.darkMode
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    store.getState().theme.darkMode
      ? store.dispatch(setLightTheme())
      : store.dispatch(setDarkTheme())
    this.setState({ theme: localStorage.theme })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Nav />
            <div className='px-5'>
              <Route exact path='/register' basename='/register' component={Register} />
              <Route exact path='/login' basename='/login' component={Login} />
              <PrivateRoute exact path='/' basename='/' component={MainTodo} />
              <PrivateRoute exact path='/category' basename='/category' component={MainCategory} />
              {/* <PrivateRoute exact path='/schedule' component={MainSchedule} /> */}

              <button id='button-mode' onClick={this.onClick}>
                {this.state.theme === 'Light' ? (
                  <label>Dark</label>
                ) : (
                  <label>Light</label>
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
