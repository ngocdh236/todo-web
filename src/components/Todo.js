import '../styles/Todo.scss'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import TodoInfo from './TodoInfo'
import { isEmpty } from '../utils/isEmpty'

export default function Todo(props) {
  const { isNewTodo } = props
  const [todo, setTodo] = useState(props.todo)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState('')

  useEffect(() => {
    setTodo(props.todo)
  }, [props.todo])

  // useEffect(() => {
  //   const categoryId = props.todo.categoryId
  //   const deadline = props.todo.deadline

  //   setTodo({
  //     ...todo,
  //     categoryId: categoryId >= 0 ? categoryId : null,
  //     deadline
  //   })
  // }, [props.todo])

  const onTitleChange = e => {
    setIsUpdating(true)
    setTodo({ ...todo, title: e.target.value })
  }

  const onDoneChange = () => {
    props.todoService.update({ ...todo, done: !todo.done })
  }

  const handleApprove = () => {
    if (isEmpty(todo.title)) {
      setShowAlert(true)
      setWarning('Title must not be blank')
    } else {
      if (isNewTodo) {
        props.todoService.create(todo)
      } else {
        props.todoService.update(todo)
      }
      setIsUpdating(false)
      setShowAlert(false)
      setShowInfo(false)
    }
  }

  const handleCancel = () => {
    setIsUpdating(false)
    setTodo(props.todo)
    setShowInfo(false)
    setShowAlert(false)
  }

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
    setShowAlert(false)
  }

  const onEnterPressed = e => {
    if (e.key === 'Enter') {
      handleApprove()
    }
  }

  const checkMark = <div id='checkbox-checkmark' onClick={onDoneChange} />

  const deadline = (() => {
    if (todo.deadline) {
      return (
        <p className='text-secondary'>
          {moment(todo.deadline).format('DD/MM/YYYY, HH:mm')}
        </p>
      )
    }
    return null
  })()

  return (
    <div className='Todo'>
      <div className='todo'>
        <div id='checkbox'>
          <button id='checkbox-button' onClick={onDoneChange} />
          {todo.done ? checkMark : null}
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
            <button onClick={handleApprove}>
              <i className='far fa-check-circle fa-lg' />
            </button>
            <button onClick={handleCancel}>
              <i className='far fa-times-circle fa-lg' />
            </button>
          </div>
        ) : null}

        {!isNewTodo && (
          <button onClick={handleShowInfo}>
            <i className='fas fa-info-circle' />
          </button>
        )}
      </div>

      {showAlert && (
        <div className='mt-3 alert alert-danger' role='alert'>
          {warning}
        </div>
      )}

      {showInfo && (
        <TodoInfo
          todo={props.todo}
          handleCancel={handleShowInfo}
          categories={props.categories}
          todoService={props.todoService}
        />
      )}
    </div>
  )
}

Todo.propTypes = {
  isNewTodo: PropTypes.bool.isRequired,
  todo: PropTypes.object.isRequired,
  todoService: PropTypes.object.isRequired,
  categories: PropTypes.array
}

Todo.defaultProps = {
  isNewTodo: false
}
