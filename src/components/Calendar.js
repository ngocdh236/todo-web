import '../styles/Calendar.scss'

import React, { Component } from 'react'
import moment from 'moment'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateObject: moment(),
      allmonths: moment.months()
    }

    // this.previousYear = this.previousYear.bind(this)
    // this.nextYear = this.nextYear.bind(this)
  }

  setMonth = month => {
    let monthNumber = this.state.allmonths.indexOf(month)
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('month', monthNumber)
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable
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

  getYears(startYear, stopYear) {
    var years = []
    var currentYear = moment(startYear)
    var endYear = moment(stopYear)
    while (currentYear < endYear) {
      years.push(moment(currentYear).format('YYYY'))
      currentYear = moment(currentYear).add(1, 'year')
    }
    return years
  }

  YearPicker = props => {
    let years = []
    let next = moment()
      .set('year', props)
      .add('year', 12)
      .format('Y')
    console.log(props)
    console.log(next)
    let twelveyears = this.getYears(props, next)

    twelveyears.map(data => {
      years.push(<td key={data}>{data}</td>)
    })

    let rows = []
    let cells = []

    years.forEach((cell, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(cell)
      } else {
        rows.push(cells)
        cells = []
        cells.push(cell)
      }
    })

    rows.push(cells)

    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>
    })

    return (
      <table>
        <tbody>{yearlist}</tbody>
      </table>
    )
  }

  previousYear() {}

  nextYear() {}

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
        {/* <this.YearPicker props={this.state.dateObject.format('Y')} /> */}

        <div className='d-flex flex-column' style={{ width: '25%' }}>
          <div className='year mb-4'>
            <i className='fas fa-chevron-left' onClick={this.previousYear} />
            {this.state.dateObject.format('Y')}
            <i className='fas fa-chevron-right' onClick={this.nextYear} />
          </div>
          <this.MonthPicker months={moment.months()} />
        </div>

        <div style={{ width: '70%' }}>
          <div className='h4 mb-4'>{this.state.dateObject.format('MMMM')}</div>

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
