import '../styles/TodoInfo.scss'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { isEmpty } from '../utils/isEmpty'

export default function TodoInfo(props) {
  const todoTitleInput = React.createRef()

  const [todo, setTodo] = useState(props.todo)
  const { isNewTodo } = props
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState('')

  if (isNewTodo) {
    todoTitleInput.current.focus()
  }

  const onTitleChange = e => {
    setTodo({ ...todo, title: e.target.value })
  }

  const onDescriptionChange = e => {
    setTodo({
      ...todo,
      description: e.target.value
    })
  }

  const onCategoryChange = category => {
    setTodo({ ...todo, category })
  }

  const onDeadlineChange = e => {
    setTodo({ ...todo, deadline: e })
  }

  const onDoneClick = () => {
    if (isEmpty(todo.title)) {
      setShowAlert(true)
      setWarning('Title must not be blank')
    } else {
      if (isNewTodo) {
        if (todo.category) {
          const newTodo = { ...todo, categoryId: todo.category.id }
          props.createTodo(newTodo)
        } else {
          props.createTodo(todo)
        }
        props.cancelNewTodo()
      } else {
        props.updateTodo(todo)
        props.onShowInfo()
      }
    }
  }

  var categories = props.categories.map(category => {
    return (
      <button key={category.id} onClick={onCategoryChange(category)}>
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
          onChange={onDescriptionChange}
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
            <button onClick={onCategoryChange(null)}>None</button>
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
          selected={todo.deadline ? new Date(todo.deadline) : null}
          onChange={onDeadlineChange}
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
        className='input font-weight-bold'
        value={todo.title}
        onChange={onTitleChange}
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
            onClick={props.deleteTodo(props.todo.id)}
          >
            Delete
          </button>
        ) : (
          <button className='button-danger ml-1' onClick={props.cancelNewTodo}>
            Cancel
          </button>
        )}
        <button className='button-light ml-1' onClick={onDoneClick}>
          Done
        </button>
      </div>
    </div>
  )
}

// TodoInfo.propTypes = {
//   todo: PropTypes.object.isRequired,
//   categories: PropTypes.array,
//   createTodo: PropTypes.func,
//   updateTodo: PropTypes.func,
//   deleteTodo: PropTypes.func,
//   newTodo: PropTypes.bool,
//   cancelNewTodo: PropTypes.func,
//   onShowInfo: PropTypes.func
// }

TodoInfo.defaultProps = {
  newTodo: false
}
