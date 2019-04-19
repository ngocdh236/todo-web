import '../styles/Calendar.scss'

import React, { Component } from 'react'
import moment from 'moment'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateObject: moment()
    }

    this.previousYear = this.previousYear.bind(this)
    this.nextYear = this.nextYear.bind(this)
    this.previousMonth = this.previousMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
  }

  setMonth = month => {
    let monthNumber = moment.months().indexOf(month)
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('month', monthNumber)
    this.setState({
      dateObject: dateObject
    })
  }

  MonthPicker = props => {
    let months = props.months.map(month => {
      return (
        <div
          key={month}
          className='month'
          onClick={() => {
            this.setMonth(month)
          }}
        >
          {month}
        </div>
      )
    })

    return <div className='month-list'>{months}</div>
  }

  previousYear() {
    let year = Number(this.state.dateObject.format('YYYY'))
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('year', year - 1)
    this.setState({
      dateObject: dateObject
    })
  }

  nextYear() {
    let year = Number(this.state.dateObject.format('YYYY'))
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('year', year + 1)
    this.setState({
      dateObject: dateObject
    })
  }

  previousMonth() {
    let month = this.state.dateObject.format('MMMM')
    let monthNumber = moment.months().indexOf(month)
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('month', monthNumber - 1)
    this.setState({
      dateObject: dateObject
    })
  }

  nextMonth() {
    let month = this.state.dateObject.format('MMMM')
    let monthNumber = moment.months().indexOf(month)
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('month', monthNumber + 1)
    this.setState({
      dateObject: dateObject
    })
  }

  render() {
    let weekdayshortname = moment.weekdaysShort().map(day => {
      return (
        <p key={day} className='lead' style={{ width: '14%' }}>
          <strong>{day}</strong>
        </p>
      )
    })

    let firstDayOfMonth = moment(this.state.dateObject)
      .startOf('month')
      .format('d')

    let blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<label>{''}</label>)
    }

    let days = []
    for (let d = 1; d <= this.state.dateObject.daysInMonth(); d++) {
      let currentDay =
        d === Number(this.state.dateObject.format('D')) ? 'today' : ''
      days.push(<label className={currentDay}>{d}</label>)
    }

    var totalSlots = [...blanks, ...days]

    let daysinmonth = totalSlots.map((slot, i) => {
      return (
        <div key={i} className='day'>
          {slot}
        </div>
      )
    })

    return (
      <div className='Calendar'>
        <div className='d-flex flex-column' style={{ width: '25%' }}>
          <div className='year mb-4'>
            <button onClick={this.previousYear}>
              <i className='fas fa-chevron-left' />
            </button>
            <div className='h4'>{this.state.dateObject.format('Y')}</div>
            <button onClick={this.nextYear}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
          <this.MonthPicker months={moment.months()} />
        </div>

        <div style={{ width: '70%' }}>
          <div className='mb-4 d-flex justify-content-around'>
            <button onClick={this.previousMonth}>
              <i className='fas fa-chevron-left' />
            </button>
            <div className='h4'>{this.state.dateObject.format('MMMM')}</div>
            <button onClick={this.nextMonth}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>

          <div>
            <div className='d-flex'>{weekdayshortname}</div>
            <div className='d-flex flex-wrap'>{daysinmonth}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar
