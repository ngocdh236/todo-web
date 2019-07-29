import '../styles/Todo.scss'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import TodoInfo from './TodoInfo'
import { isEmpty } from '../utils/isEmpty'

export default function Todo(props) {
  const [todo, setTodo] = useState(props.todo)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState('')

  // componentDidUpdate(prevProps) {
  //   if (props.todo !== prevProps.todo) {
  //     setState({
  //       ...state,
  //       todo: props.todo
  //     })
  //   }
  // }

  const onTitleChange = e => {
    setIsUpdating(true)
    setTodo({ ...todo, title: e.target.value })
  }

  const onDoneChange = () => {
    setTodo(Object.assign(todo, { done: !todo.done }))
    props.todoService.update(todo)
  }

  const onUpdate = () => {
    if (isEmpty(todo.title)) {
      setShowAlert(true)
      setWarning('Title must not be blank')
    } else {
      props.todoService.update(todo)
      setIsUpdating(false)
      setShowAlert(false)
      setShowInfo(false)
    }
  }

  const onCancelUpdate = () => {
    setIsUpdating(false)
    setTodo(props.todo)
    setShowInfo(false)
    setShowAlert(false)
  }

  const onShowInfo = () => {
    setShowInfo(!showInfo)
    setShowAlert(false)
  }

  const onEnterPressed = e => {
    if (e.key === 'Enter') {
      onUpdate()
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
            <button onClick={onUpdate}>
              <i className='far fa-check-circle fa-lg' />
            </button>
            <button onClick={onCancelUpdate}>
              <i className='far fa-times-circle fa-lg' />
            </button>
          </div>
        ) : null}

        <button onClick={onShowInfo}>
          <i className='fas fa-info-circle' />
        </button>
      </div>

      {showAlert ? (
        <div className='mt-3 alert alert-danger' role='alert'>
          {warning}
        </div>
      ) : null}

      {showInfo ? <TodoInfo todo={props.todo} onShowInfo={onShowInfo} /> : null}
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  todoService: PropTypes.object.isRequired
}
