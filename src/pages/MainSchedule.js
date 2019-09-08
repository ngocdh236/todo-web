import '../styles/MainSchedule.scss'

import React, { useContext, useState } from 'react'
import moment from 'moment'
import classnames from 'classnames'

import { DataContext } from '../contexts/DataContext'
import TodoList from '../components/TodoList'

export default function MainSchedule() {
  const { data, todoService } = useContext(DataContext)
  const [dateObject, setDateObject] = useState(moment(data.dateFilter))

  const todos = data.todos.filter(
    todo =>
      moment(todo.deadline)
        .startOf('day')
        .format() ===
      moment(dateObject)
        .startOf('day')
        .format()
  )

  const setDay = day => {
    todoService.setDateFilter(moment(dateObject).set('date', day))
  }

  const setMonth = month => {
    const monthNumber = moment.months().indexOf(month)
    setDateObject(moment(dateObject).set('month', monthNumber))
  }

  const MonthPicker = props => {
    const months = props.months.map(month => {
      const chosenMonth = dateObject.format('MMMM') === String(month)
      return (
        <div
          key={month}
          className={classnames('month', {
            'chosen-month': chosenMonth
          })}
          onClick={() => {
            setMonth(month)
          }}
        >
          {month}
        </div>
      )
    })

    return <div className='MonthPicker'>{months}</div>
  }

  const MonthDropdown = props => {
    const months = props.months.map(month => {
      return (
        <button
          key={month}
          className='month'
          onClick={() => {
            setMonth(month)
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
          {dateObject.format('MMMM')}
        </button>
        <div className='dropdown-content'>{months}</div>
      </div>
    )
  }

  const DayPicker = () => {
    const firstDayOfMonth = moment(dateObject)
      .startOf('month')
      .format('d')

    const blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<label>{''}</label>)
    }

    const days = []
    for (let d = 1; d <= dateObject.daysInMonth(); d++) {
      const numberOfTodos = []
      data.todos.forEach((todo, i) => {
        if (
          moment(todo.deadline)
            .startOf('day')
            .format() ===
          moment(dateObject)
            .date(d)
            .startOf('day')
            .format()
        )
          numberOfTodos.push(<div key={i} className='dot' />)
      })

      const isChosenDay = d === Number(dateObject.format('D'))

      days.push(
        <div
          className={classnames('day-content', {
            'chosen-day-content': isChosenDay
          })}
          onClick={() => {
            setDay(d)
          }}
        >
          <label className={classnames({ 'chosen-day': isChosenDay })}>
            {d}
          </label>
          <div className='date-todos'>{numberOfTodos}</div>
        </div>
      )
    }

    const totalSlots = [...blanks, ...days]

    const daysinmonth = totalSlots.map((slot, i) => {
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

  const setToday = () => {
    todoService.setDateFilter(moment())
  }

  const previousYear = () => {
    const year = Number(dateObject.format('YYYY'))
    setDateObject(moment(dateObject).set('year', year - 1))
  }

  const nextYear = () => {
    const year = Number(dateObject.format('YYYY'))
    setDateObject(moment(dateObject).set('year', year + 1))
  }

  const previousMonth = () => {
    const month = dateObject.format('MMMM')
    const monthNumber = moment.months().indexOf(month)
    setDateObject(moment(dateObject).set('month', monthNumber - 1))
  }

  const nextMonth = () => {
    const month = dateObject.format('MMMM')
    const monthNumber = moment.months().indexOf(month)
    setDateObject(moment(dateObject).set('month', monthNumber + 1))
  }

  const weekdayshortname = moment.weekdaysShort().map(day => {
    return (
      <p key={day} className='lead' style={{ width: '14.285%' }}>
        <strong>{day}</strong>
      </p>
    )
  })

  return (
    <div className='MainSchedule'>
      <div className='d-flex justify-content-between mb-4'>
        <MonthDropdown months={moment.months()} />
      </div>

      <div className='d-flex flex-wrap justify-content-between text-center'>
        <button
          className='button-light mb-5'
          onClick={setToday}
          style={{ width: '100%' }}
        >
          TODAY
        </button>

        <div className='aside-list d-flex flex-column'>
          <div className='year mb-4'>
            <button className='chevron' onClick={previousYear}>
              <i className='fas fa-chevron-left' />
            </button>
            <div className='h4'>{dateObject.format('Y')}</div>
            <button className='chevron' onClick={nextYear}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
          <MonthPicker months={moment.months()} />
        </div>

        <div className='main-list'>
          <div className='mb-4 d-flex justify-content-between'>
            <button className='chevron' onClick={previousMonth}>
              <i className='fas fa-chevron-left' />
            </button>
            <div className='h4'>{dateObject.format('MMMM')}</div>
            <button className='chevron' onClick={nextMonth}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>

          <div>
            <div className='d-flex mb-2'>{weekdayshortname}</div>
            <DayPicker />
          </div>
          <TodoList
            todos={todos}
            categories={data.categories}
            todoService={todoService}
            deadline={dateObject}
          />
        </div>
      </div>
    </div>
  )
}
