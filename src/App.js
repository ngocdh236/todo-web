import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Register from './components/Register'
import Login from './components/Login'
import MainTodo from './components/MainTodo/MainTodo'
import MainSchedule from './components/MainSchedule'

import './App.scss'

class App extends Component {
  render() {
    return (
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
    )
  }
}

export default App
