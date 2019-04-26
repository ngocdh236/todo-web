import '../styles/Todo.scss'

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import TodoInfoLink from '../containers/TodoInfoLink'
import isEmpty from '../validation/is-empty'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: props.todo,
      updateTodo: false,
      showInfo: false,
      alert: false,
      warning: ''
    }

    this.onDoneChange = this.onDoneChange.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onCancelUpdate = this.onCancelUpdate.bind(this)
    this.onShowInfo = this.onShowInfo.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  onTitleChange(e) {
    this.setState({
      ...this.state,
      updateTodo: true,
      todo: { ...this.state.todo, title: e.target.value }
    })
  }

  onDoneChange() {
    this.setState(
      {
        ...this.state,
        todo: { ...this.state.todo, done: !this.state.todo.done }
      },
      () => this.props.updateTodo(this.state.todo)
    )
  }

  onUpdate() {
    let todo = this.state.todo
    if (isEmpty(todo.title)) {
      this.setState({
        ...this.state,
        alert: true,
        warning: 'Title must not be blank'
      })
    } else {
      this.props.updateTodo(todo)
      this.setState({
        ...this.state,
        updateTodo: false,
        alert: false,
        showInfo: false
      })
    }
  }

  onCancelUpdate() {
    this.setState({
      ...this.state,
      updateTodo: false,
      todo: this.props.todo,
      showInfo: false,
      alert: false
    })
  }

  onShowInfo() {
    this.setState({
      ...this.state,
      showInfo: !this.state.showInfo,
      alert: false
    })
  }

  render() {
    const done = this.state.todo.done

    const checkMark = (
      <div id='checkbox-checkmark' onClick={this.onDoneChange} />
    )

    const deadline = (() => {
      if (this.state.todo.deadline) {
        var deadline = moment
          .utc(this.state.todo.deadline)
          .format('DD/MM/YYYY, HH:mm')

        return <p className='text-secondary'>{deadline}</p>
      }
      return null
    })()

    return (
      <div className='Todo'>
        <div className='todo'>
          <div id='checkbox'>
            <button id='checkbox-button' onClick={this.onDoneChange} />
            {done ? checkMark : null}
          </div>

          <div className='d-flex flex-column mx-3' style={{ width: '100%' }}>
            <input
              type='text'
              value={this.state.todo.title}
              onChange={this.onTitleChange}
            />
            {deadline}
          </div>

          {this.state.updateTodo ? (
            <div style={{ display: 'flex' }}>
              <button onClick={this.onUpdate}>
                <i className='far fa-check-circle fa-lg' />
              </button>
              <button onClick={this.onCancelUpdate}>
                <i className='far fa-times-circle fa-lg' />
              </button>
            </div>
          ) : null}

          <button onClick={this.onShowInfo}>
            <i className='fas fa-info-circle' />
          </button>
        </div>

        {this.state.alert ? (
          <div className='mt-3 alert alert-danger' role='alert'>
            {this.state.warning}
          </div>
        ) : null}

        {this.state.showInfo ? (
          <TodoInfoLink todo={this.props.todo} onShowInfo={this.onShowInfo} />
        ) : null}
      </div>
    )
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired
}

export default Todo
