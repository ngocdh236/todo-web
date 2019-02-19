import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Todo from './components/layout/Todo'
import Schedule from './components/layout/Schedule'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/todo' component={Todo} />
            <Route exact path='/schedule' component={Schedule} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
