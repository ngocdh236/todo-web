import '../styles/TodoInfo.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { deleteTodo } from '../actions/todoActions'

class TodoInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: props.todo
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onDeadlineChange = this.onDeadlineChange.bind(this)
  }

  onTitleChange(e) {
    this.setState({
      todo: { ...this.state.todo, title: e.target.value }
    })
  }

  onDescriptionChange(e) {
    this.setState({
      todo: { ...this.state.todo, description: e.target.value }
    })
  }

  onCategoryChange = category => {
    return () => {
      this.setState({
        todo: { ...this.state.todo, category: category }
      })
    }
  }

  onDeadlineChange(e) {
    this.setState({
      todo: { ...this.state.todo, deadline: e }
    })
  }

  render() {
    var categories = this.props.categories.map(category => {
      return (
        <button key={category.id} onClick={this.onCategoryChange(category)}>
          {category.name}
        </button>
      )
    })

    var category = this.state.todo.category
    var description = this.state.todo.description

    return (
      <div className='TodoInfo p-2'>
        <input
          type='text'
          className='input font-weight-bold'
          value={this.state.todo.title}
          onChange={this.onTitleChange}
        />

        <div className='horizontal-line my-3' />

        <table className='table table-borderless'>
          <tbody>
            {/* Description */}
            <tr>
              <td className='text-secondary'>Description</td>
              <td>
                <textarea
                  type='text'
                  className='input autoExpand'
                  value={description ? description : undefined}
                  onChange={this.onDescriptionChange}
                />
              </td>
            </tr>

            {/* Category */}
            <tr>
              <td className='text-secondary'>Category</td>
              <td>
                <div className='dropdown'>
                  <button className='dropbtn'>
                    {category ? category.name : 'Choose category'}
                  </button>

                  <div className='dropdown-content'>
                    {categories}
                    <div className='horizontal-line mx-2' />
                    <button onClick={this.onCategoryChange(null)}>None</button>
                  </div>
                </div>
              </td>
            </tr>

            {/* Deadline */}
            <tr className='deadline'>
              <td className='text-secondary'>Deadline</td>
              <td>
                <DatePicker
                  todayButton={'Today'}
                  className='date-picker'
                  selected={
                    this.state.todo.deadline
                      ? new Date(this.state.todo.deadline)
                      : null
                  }
                  onChange={this.onDeadlineChange}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='MMMM d, yyyy h:mm aa'
                  timeCaption='Time'
                  isClearable={true}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className='buttons'>
          <button
            className='btn btn-danger ml-1'
            onClick={this.props.deleteTodo(this.props.todo.id)}>
            Delete
          </button>
          <button
            className='btn btn-light ml-1'
            onClick={this.props.onInfoDoneClick(this.state.todo)}>
            Done
          </button>
        </div>
      </div>
    )
  }
}

TodoInfo.propTypes = {
  todo: PropTypes.object,
  categories: PropTypes.array,
  onInfoDoneClick: PropTypes.func,
  updateTodo: PropTypes.func,
  deleteTodo: PropTypes.func
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(
  mapStateToProps,
  { deleteTodo }
)(TodoInfo)
