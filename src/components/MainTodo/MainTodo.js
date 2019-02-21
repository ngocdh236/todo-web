import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainTodo.scss'

class MainTodo extends Component {
  constructor() {
    super()

    this.togglePopup = this.togglePopup.bind(this)

    this.state = {
      showPopup: false,
      todo: ''
    }
  }

  togglePopup(event) {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  //style={{ backgroundColor: 'blue' }}
  render() {
    return (
      <div className='d-flex flex-wrap mt-5'>
        <div className='header d-flex'>
          <h4 className='my-auto'>TODO</h4>
          <button
            onClick={this.togglePopup}
            className='btn btn-primary ml-auto'
          >
            + Add new
          </button>
        </div>
        <div className='nav d-flex flex-column bg-dark'>
          <p>sadsadas</p>
        </div>

        <div className='main d-flex flex-column bg-dark'>
          <div>
            <p>sadsadas</p>
            <p>sadsadas</p>
            <p>sadsadas</p>
          </div>
        </div>

        {this.state.showPopup ? <Popup closePopup={this.togglePopup} /> : null}
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

export default MainTodo
