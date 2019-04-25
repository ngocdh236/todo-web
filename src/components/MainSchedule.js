import '../styles/MainSchedule.scss'

import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'

import NewTodoForm from './NewTodoForm'
import ScheduledTodoList from '../containers/ScheduledTodoList'

class MainSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateObject: moment(),
      addNewTodo: false
    }

    this.toggleAddNewTodo = this.toggleAddNewTodo.bind(this)
    this.today = this.today.bind(this)
    this.previousYear = this.previousYear.bind(this)
    this.nextYear = this.nextYear.bind(this)
    this.previousMonth = this.previousMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
  }

  toggleAddNewTodo() {
    this.setState({
      ...this.state,
      addNewTodo: !this.state.addNewTodo
    })
  }

  setDay = day => {
    let dateObject = this.state.dateObject
    dateObject = moment(dateObject).set('date', day)
    this.setState({
      dateObject: dateObject
    })
  }

  setMonth = month => {
    let monthNumber = moment.months().indexOf(month)
    let dateObject = this.state.dateObject
    dateObject = moment(dateObject).set('month', monthNumber)
    this.setState({
      dateObject: dateObject
    })
  }

  MonthPicker = props => {
    let months = props.months.map(month => {
      let chosenMonth = this.state.dateObject.format('MMMM') === String(month)
      return (
        <div
          key={month}
          className={classnames('month', {
            'chosen-month': chosenMonth
          })}
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

  today() {
    let dateObject = moment()
    this.setState({
      dateObject: dateObject
    })
  }

  previousYear() {
    let year = Number(this.state.dateObject.format('YYYY'))
    let dateObject = this.state.dateObject
    dateObject = moment(dateObject).set('year', year - 1)
    this.setState({
      dateObject: dateObject
    })
  }

  nextYear() {
    let year = Number(this.state.dateObject.format('YYYY'))
    let dateObject = this.state.dateObject
    dateObject = moment(dateObject).set('year', year + 1)
    this.setState({
      dateObject: dateObject
    })
  }

  previousMonth() {
    let month = this.state.dateObject.format('MMMM')
    let monthNumber = moment.months().indexOf(month)
    let dateObject = this.state.dateObject
    dateObject = moment(dateObject).set('month', monthNumber - 1)
    this.setState({
      dateObject: dateObject
    })
  }

  nextMonth() {
    let month = this.state.dateObject.format('MMMM')
    let monthNumber = moment.months().indexOf(month)
    let dateObject = this.state.dateObject
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
      let chosenDay =
        d === Number(this.state.dateObject.format('D')) ? 'chosen-day' : ''
      days.push(
        <label
          className={chosenDay}
          onClick={() => {
            this.setDay(d)
          }}
        >
          {d}
        </label>
      )
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
      <div className='MainSchedule'>
        <button className='btn btn-light mb-4' onClick={this.toggleAddNewTodo}>
          + New Todo
        </button>

        <div className='d-flex flex-wrap justify-content-between text-center'>
          <button
            className='btn btn-light mb-5'
            onClick={this.today}
            style={{ width: '100%' }}
          >
            TODAY
          </button>
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
              <div className='d-flex mb-2'>{weekdayshortname}</div>
              <div
                className='d-flex flex-wrap'
                style={{
                  borderLeft: '0.5px solid gainsboro'
                }}
              >
                {daysinmonth}
              </div>
            </div>
            <ScheduledTodoList
              date={moment
                .utc(this.state.dateObject)
                .startOf('day')
                .format()}
            />
          </div>
        </div>
        {this.state.addNewTodo ? (
          <NewTodoForm
            toggleAddNewTodo={this.toggleAddNewTodo}
            deadline={moment.utc(this.state.dateObject).format()}
          />
        ) : null}
      </div>
    )
  }
}

export default MainSchedule
