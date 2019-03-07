import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'
import Nav from './components/layout/Nav'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MainTodo from './components/layout/MainTodo/MainTodo'
import MainSchedule from './components/layout/MainSchedule'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import { logoutUser } from './actions/authActions'

import './App.scss'

if (localStorage.token) {
  setAuthToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      darkMode: false
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState({ darkMode: !this.state.darkMode })
  }

  setLightTheme() {
    let root = document.documentElement
    root.style.setProperty('--background-primary', '#fff')
    root.style.setProperty('--background-secondary', 'yellow')
    root.style.setProperty('--text-primary', '#000')
  }

  setDarkTheme() {
    let root = document.documentElement
    root.style.setProperty('--background-primary', '#000')
    root.style.setProperty('--background-secondary', '#37474f')
    root.style.setProperty('--text-primary', '#fff')
  }

  componentDidUpdate() {
    this.state.darkMode ? this.setDarkTheme() : this.setLightTheme()
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
              <Route exact path='/todo' component={MainTodo} />
              <Route exact path='/schedule' component={MainSchedule} />
            </div>
            <button id='button-mode' onClick={this.onClick}>
              {this.state.darkMode ? <label>Light</label> : <label>Dark</label>}
            </button>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
