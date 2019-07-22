import '../styles/MainSchedule.scss'

import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NewTodoForm from '../components/NewTodoForm'
import ScheduledTodoList from '../components/ScheduledTodoList'
import { isEmpty } from '../utils/isEmpty'

class MainSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateObject: moment(),
      addNewTodo: false,
      scheduledTodos: props.todos.filter(todo => !isEmpty(todo.deadline))
    }

    this.toggleAddNewTodo = this.toggleAddNewTodo.bind(this)
    this.today = this.today.bind(this)
    this.previousYear = this.previousYear.bind(this)
    this.nextYear = this.nextYear.bind(this)
    this.previousMonth = this.previousMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        ...this.state,
        scheduledTodos: this.props.todos.filter(todo => !isEmpty(todo.deadline))
      })
    }
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

    return <div className='MonthPicker'>{months}</div>
  }

  MonthDropdown = props => {
    let months = props.months.map(month => {
      return (
        <button
          key={month}
          className='month'
          onClick={() => {
            this.setMonth(month)
          }}
        >
          {month}
        </button>
      )
    })

    return (
      <div className='MonthDropdown dropdown'>
        <button
          className='dropbtn'
          style={{ minWidth: '100px', height: '40px' }}
        >
          {this.state.dateObject.format('MMMM')}
        </button>
        <div className='dropdown-content'>{months}</div>
      </div>
    )
  }

  DayPicker = () => {
    let firstDayOfMonth = moment(this.state.dateObject)
      .startOf('month')
      .format('d')

    let blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<label>{''}</label>)
    }

    let days = []
    for (let d = 1; d <= this.state.dateObject.daysInMonth(); d++) {
      let dateTodos = []
      this.state.scheduledTodos.forEach((todo, i) => {
        if (
          moment(todo.deadline)
            .startOf('day')
            .format() ===
          moment(this.state.dateObject)
            .date(d)
            .startOf('day')
            .format()
        )
          dateTodos.push(<div key={i} className='dot' />)
      })

      let chosenDay =
        d === Number(this.state.dateObject.format('D')) ? 'chosen-day' : ''

      days.push(
        <div
          className='day-content'
          onClick={() => {
            this.setDay(d)
          }}
        >
          <label className={chosenDay}>{d}</label>
          <div className='date-todos'>{dateTodos}</div>
        </div>
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
      <div
        className='d-flex flex-wrap'
        style={{
          borderLeft: '0.5px solid var(--background-secondary)'
        }}
      >
        {daysinmonth}
      </div>
    )
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
        <p key={day} className='lead' style={{ width: '14.285%' }}>
          <strong>{day}</strong>
        </p>
      )
    })

    return (
      <div className='MainSchedule'>
        <div className='d-flex justify-content-between'>
          <this.MonthDropdown months={moment.months()} />
          <button
            className='button-light mb-4 ml-auto'
            onClick={this.toggleAddNewTodo}
          >
            + New Todo
          </button>
        </div>

        <div className='d-flex flex-wrap justify-content-between text-center'>
          <button
            className='button-light mb-4'
            onClick={this.today}
            style={{ width: '100%' }}
          >
            TODAY
          </button>

          <div className='aside-list d-flex flex-column'>
            <div className='year mb-4'>
              <button className='chevron' onClick={this.previousYear}>
                <i className='fas fa-chevron-left' />
              </button>
              <div className='h4'>{this.state.dateObject.format('Y')}</div>
              <button className='chevron' onClick={this.nextYear}>
                <i className='fas fa-chevron-right' />
              </button>
            </div>
            <this.MonthPicker months={moment.months()} />
          </div>

          <div className='main-list'>
            <div className='mb-4 d-flex justify-content-between'>
              <button className='chevron' onClick={this.previousMonth}>
                <i className='fas fa-chevron-left' />
              </button>
              <div className='h4'>{this.state.dateObject.format('MMMM')}</div>
              <button className='chevron' onClick={this.nextMonth}>
                <i className='fas fa-chevron-right' />
              </button>
            </div>

            <div>
              <div className='d-flex mb-2'>{weekdayshortname}</div>
              <this.DayPicker />
            </div>
            <ScheduledTodoList date={this.state.dateObject} />
          </div>
        </div>
        {this.state.addNewTodo ? (
          <NewTodoForm
            toggleAddNewTodo={this.toggleAddNewTodo}
            deadline={this.state.dateObject}
          />
        ) : null}
      </div>
    )
  }
}

MainSchedule.propTypes = {
  todos: PropTypes.array
}

const mapStateToProps = state => ({
  todos: state.todos
})

export default connect(mapStateToProps)(MainSchedule)
