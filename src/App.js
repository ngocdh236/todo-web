import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Nav from './components/Nav'
import Register from './components/Register'
import Login from './components/Login'
import MainTodo from './components/MainTodo/MainTodo'
import MainSchedule from './components/MainSchedule'
import jwt_decode from 'jwt-decode'
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
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
