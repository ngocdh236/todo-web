import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'
import Nav from './components/layout/Nav'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MainTodo from './components/layout/MainTodo'
import MainCategory from './components/layout/MainCategory'
import MainSchedule from './components/layout/MainSchedule'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { setLightTheme, setDarkTheme } from './actions/themeActions'
import { getTodos } from './actions/todoActions'
import { getCategories } from './actions/categoryActions'

import './App.scss'

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
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/' component={MainTodo} />
              <Route exact path='/category' component={MainCategory} />
              <Route exact path='/schedule' component={MainSchedule} />
            </div>
            <button id='button-mode' onClick={this.onClick}>
              {this.state.theme === 'Light' ? (
                <label>Dark</label>
              ) : (
                <label>Light</label>
              )}
            </button>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
