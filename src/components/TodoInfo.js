import '../styles/TodoInfo.scss'

import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import isEmpty from '../validation/is-empty'

class TodoInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: props.todo,
      newTodo: props.newTodo,
      alert: false,
      warning: ''
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onDeadlineChange = this.onDeadlineChange.bind(this)
    this.onDoneClick = this.onDoneClick.bind(this)
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

  onDoneClick() {
    let todo = this.state.todo
    if (isEmpty(todo.title)) {
      this.setState({
        ...this.state,
        alert: true,
        warning: 'Title must not be blank'
      })
    } else {
      if (this.state.newTodo) {
        if (todo.category) {
          let newTodo = Object.assign(todo, {
            categoryId: todo.category.id
          })
          this.props.createTodo(newTodo)
        } else {
          this.props.createTodo(todo)
        }
        this.props.cancelNewTodo()
      } else {
        this.props.updateTodo(todo)
        this.props.onShowInfo()
      }
    }
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

    var descriptionInfo = (
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
    )

    var categoryInfo = (
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
    )

    var deadlineInfo = (
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
            isClearable={this.state.newTodo ? false : true}
          />
        </td>
      </tr>
    )

    return (
      <div className='TodoInfo p-2'>
        <input
          type='text'
          className='input font-weight-bold'
          value={this.state.todo.title}
          onChange={this.onTitleChange}
        />

        <div className='horizontal-line my-3' />

        {this.state.alert ? (
          <div className='mt-3 alert alert-danger' role='alert'>
            {this.state.warning}
          </div>
        ) : null}

        <table className='table table-borderless'>
          <tbody>
            {descriptionInfo}
            {categoryInfo}
            {deadlineInfo}
          </tbody>
        </table>

        <div className='buttons'>
          {!this.state.newTodo ? (
            <button
              className='btn btn-danger ml-1'
              onClick={this.props.deleteTodo(this.props.todo.id)}
            >
              Delete
            </button>
          ) : (
            <button
              className='btn btn-danger ml-1'
              onClick={this.props.cancelNewTodo}
            >
              Cancel
            </button>
          )}
          <button className='btn btn-light ml-1' onClick={this.onDoneClick}>
            Done
          </button>
        </div>
      </div>
    )
  }
}

TodoInfo.propTypes = {
  todo: PropTypes.object.isRequired,
  categories: PropTypes.array,
  createTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  newTodo: PropTypes.bool,
  cancelNewTodo: PropTypes.func,
  onShowInfo: PropTypes.func
}

TodoInfo.defaultProps = {
  newTodo: false
}

export default TodoInfo
