import React, { Component } from 'react'

class MainSchedule extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-sm'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>Schedule</li>
            <li className='nav-item'>
              <button className='btn btn-primary'>+ Add new</button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default MainSchedule
