import '../styles/Calendar.scss'

import React, { Component } from 'react'
import moment from 'moment'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateObject: moment(),
      allmonths: moment.months(),
      showMonthTable: false
    }
  }

  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable
    })
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

  MonthList = props => {
    let months = []
    props.data.map(data => {
      months.push(
        <td
          onClick={e => {
            this.setMonth(data)
          }}
        >
          <span>{data}</span>
        </td>
      )
    })

    let rows = []
    let cells = []

    months.forEach((cell, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(cell)
      } else {
        rows.push(cells)
        cells = []
        cells.push(cell)
      }
    })

    rows.push(cells)

    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>
    })

    return (
      <table>
        <thead>
          <tr>
            <th colSpan='4'>Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    )
  }

  render() {
    let weekdayshortname = moment.weekdaysShort().map(day => {
      return <th className='week-day'>{day}</th>
    })

    let firstDayOfMonth = moment(this.state.dateObject)
      .startOf('month')
      .format('d')

    let blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<td>{''}</td>)
    }

    let daysInMonth = []
    for (let d = 1; d <= this.state.dateObject.daysInMonth(); d++) {
      let currentDay =
        d === Number(this.state.dateObject.format('D')) ? 'today' : ''
      daysInMonth.push(<td className={currentDay}>{d}</td>)
    }

    var totalSlots = [...blanks, ...daysInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((cell, i) => {
      if (i % 7 !== 0) {
        cells.push(cell)
      } else {
        rows.push(cells)
        cells = []
        cells.push(cell)
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells)
      }
    })

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>
    })

    return (
      <div className='Calendar'>
        <div
          className='h4 text-center'
          onClick={e => {
            this.showMonth()
          }}
        >
          {this.state.dateObject.format('MMMM')}
        </div>

        {this.state.showMonthTable && <this.MonthList data={moment.months()} />}
        <table>
          <thead>
            <tr>{weekdayshortname}</tr>
          </thead>
          <tbody>{daysinmonth}</tbody>
        </table>
      </div>
    )
  }
}

export default Calendar
