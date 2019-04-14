import '../styles/MainSchedule.scss'

import React, { Component } from 'react'

import Calendar from '../components/Calendar'

class MainSchedule extends Component {
  render() {
    return (
      <div className='MainSchedule'>
        <button className='btn btn-light mb-4'>+ Add new</button>
        <Calendar />
      </div>
    )
  }
}

export default MainSchedule
