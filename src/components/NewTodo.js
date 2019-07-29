import '../styles/Todo.scss'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { isEmpty } from '../utils/isEmpty'

export default function NewTodo(props) {
  const [todo, setTodo] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState('')

  // componentDidUpdate(prevProps) {
  //   var categoryId = props.todo.categoryId
  //   var deadline = this.props.todo.deadline

  //   if (
  //     categoryId !== prevProps.todo.categoryId ||
  //     deadline !== prevProps.todo.deadline
  //   ) {
  //     this.setState({
  //       ...this.state,
  //       todo: {
  //         ...todo,
  //         categoryId: categoryId && categoryId >= 0 ? categoryId : null,
  //         deadline: deadline ? deadline : null
  //       }
  //     })
  //   }
  // }

  const onTitleChange = e => {
    setIsUpdating(true)
    setTodo({ ...todo, title: e.target.value })
  }

  const onCreate = () => {
    if (isEmpty(todo.title)) {
      setShowAlert(true)
      setWarning('Title must not be blank')
    } else {
      props.todoService.create(todo)
      setTodo(props.todo)
      setIsUpdating(false)
      setShowAlert(false)
    }
  }

  const onCancelCreate = () => {
    setIsUpdating(false)
    setTodo(props.todo)
    setShowAlert(false)
  }

  const onEnterPressed = e => {
    if (e.key === 'Enter') {
      onCreate()
    }
  }

  const deadline = todo.deadline ? (
    <p className='text-secondary'>
      {moment(todo.deadline).format('DD/MM/YYYY, HH:mm')}
    </p>
  ) : null

  return (
    <div className='Todo'>
      <div className='todo'>
        <div id='checkbox'>
          <button id='checkbox-button' />
        </div>

        <div className='d-flex flex-column mx-3' style={{ width: '100%' }}>
          <input
            type='text'
            value={todo.title}
            onChange={onTitleChange}
            onKeyDown={onEnterPressed}
          />
          {deadline}
        </div>

        {isUpdating ? (
          <div style={{ display: 'flex' }}>
            <button onClick={onCreate}>
              <i className='far fa-check-circle fa-lg' />
            </button>
            <button onClick={onCancelCreate}>
              <i className='far fa-times-circle fa-lg' />
            </button>
          </div>
        ) : null}
      </div>

      {showAlert ? (
        <div className='mt-3 alert alert-danger' role='alert'>
          {warning}
        </div>
      ) : null}
    </div>
  )
}

NewTodo.propTypes = {
  todo: PropTypes.object.isRequired,
  todoService: PropTypes.object.isRequired
}
