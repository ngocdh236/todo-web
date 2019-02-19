import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Todo extends Component {
  constructor() {
    super()
    this.state = {
      showPopup: false
    }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-sm'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>TODO</li>
            <li className='nav-item'>
              <button
                onClick={this.togglePopup.bind(this)}
                className='btn btn-primary'
              >
                + Add new
              </button>
            </li>
          </ul>
        </nav>
        <div className='container bg-dark'>
          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup.bind(this)} />
          ) : null}
        </div>
      </div>
    )
  }
}

class Popup extends React.Component {
  
  render() {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <button onClick={this.props.closePopup} className='btn btn-light'>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default Todo
