import '../styles/TodoInfo.scss'

import React, { createRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { isEmpty } from '../utils/isEmpty'

export default function TodoInfo(props) {
  const todoTitleInput = createRef()

  const [todo, setTodo] = useState(props.todo)
  const { isNewTodo } = props
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState('')

  useEffect(() => {
    if (isNewTodo) {
      todoTitleInput.current.focus()
    }
  }, [])

  const handleTodoChange = e => {
    const { name, value } = e.target
    setTodo({ ...todo, [name]: value })
  }

  const handleDeadlineChange = e => {
    setTodo({ ...todo, deadline: e })
  }

  const handleCategoryChange = category => {
    setTodo({ ...todo, category })
  }

  const handleApprove = () => {
    if (isEmpty(todo.title)) {
      setShowAlert(true)
      setWarning('Title must not be blank')
    } else {
      if (isNewTodo) {
        props.todoService.create(todo)
        props.handleCancel()
      } else {
        if (todo !== props.todo) {
          props.todoService.update(todo)
        }
        props.handleCancel()
      }
    }
  }

  const categories = props.categories.map(category => {
    return (
      <button key={category.id} onClick={() => handleCategoryChange(category)}>
        {category.name}
      </button>
    )
  })

  var descriptionInfo = (
    <tr>
      <td className='text-secondary'>Description</td>
      <td>
        <textarea
          type='text'
          className='input autoExpand'
          value={todo.description ? todo.description : undefined}
          name='description'
          onChange={handleTodoChange}
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
            {todo.category ? todo.category.name : 'Choose category'}
          </button>

          <div className='dropdown-content'>
            {categories}
            <div className='horizontal-line mx-2' />
            <button onClick={() => handleCategoryChange(null)}>None</button>
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
          name='deadline'
          todayButton={'Today'}
          className='date-picker'
          selected={todo.deadline ? new Date(todo.deadline) : null}
          onChange={handleDeadlineChange}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          dateFormat='MMMM d, yyyy h:mm aa'
          timeCaption='Time'
          isClearable={isNewTodo ? false : true}
        />
      </td>
    </tr>
  )

  return (
    <div className='TodoInfo p-2'>
      <input
        type='text'
        name='title'
        className='input font-weight-bold'
        value={todo.title}
        onChange={handleTodoChange}
        ref={todoTitleInput}
      />

      <div className='horizontal-line my-3' />

      {showAlert ? (
        <div className='mt-3 alert alert-danger' role='alert'>
          {warning}
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
        {!isNewTodo ? (
          <button
            className='button-danger ml-1'
            onClick={() => props.todoService.remove(props.todo.id)}
          >
            Delete
          </button>
        ) : (
          <button className='button-danger ml-1' onClick={props.handleCancel}>
            Cancel
          </button>
        )}
        <button className='button-light ml-1' onClick={handleApprove}>
          Done
        </button>
      </div>
    </div>
  )
}

TodoInfo.propTypes = {
  isNewTodo: PropTypes.bool.isRequired,
  todo: PropTypes.object.isRequired,
  categories: PropTypes.array,
  todoService: PropTypes.object,
  handleCancel: PropTypes.func
}

TodoInfo.defaultProps = {
  isNewTodo: false
}
