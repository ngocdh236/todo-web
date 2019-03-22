import React from 'react'
import '../../styles/Todo.scss'
import PropTypes from 'prop-types'
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById
} from '../../actions/todoActions'
import TodoInfo from './TodoInfo'
import isEmpty from '../../validation/is-empty'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: props.newTodo,
      todo: props.todo,
      updateTodo: false,
      showInfo: false,
      alert: false,
      warning: ''
    }

    this.onDoneChange = this.onDoneChange.bind(this)
    this.onCreateOrUpdate = this.onCreateOrUpdate.bind(this)
    this.onCancelCreateOrUpdate = this.onCancelCreateOrUpdate.bind(this)
    this.onShowInfo = this.onShowInfo.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onInfoChange = this.onInfoChange.bind(this)

    this.todoElement = React.createRef()
  }

  onTitleChange(e) {
    this.setState({
      ...this.state,
      updateTodo: true,
      todo: { ...this.state.todo, title: e.target.value }
    })

    if (this.state.showInfo) {
      this.todoElement.current.onTitleChange(e)
    }

    // TODO: change updateTodo to false if title remains the same
  }

  onDoneChange() {
    if (!this.state.newTodo) {
      this.setState(
        {
          ...this.state,
          todo: { ...this.state.todo, done: !this.state.todo.done }
        },
        () =>
          updateTodo(this.state.todo).then(res => {
            if (!res.data.success) {
              this.setState({
                ...this.state,
                todo: { ...this.state.todo, done: !this.state.todo.done }
              })
            }
          })
      )
    }
  }

  onCreateOrUpdate = todo => {
    return () => {
      if (isEmpty(this.state.todo.title)) {
        this.setState({
          ...this.state,
          alert: true,
          warning: 'Title must not be blank'
        })
      } else {
        if (this.state.newTodo) {
          createTodo(this.state.todo).then(res => {
            if (res.status <= 201) {
              this.setState(
                { ...this.state, updateTodo: false, newTodo: false },
                () => this.props.addToTodoList(res.data)
              )
              this.setState({
                updateTodo: false,
                newTodo: this.props.newTodo,
                todo: this.props.todo,
                alert: false
              })
            }
          })
        } else {
          updateTodo(todo).then(res => {
            if (res.data.success) {
              this.setState({
                ...this.state,
                todo: todo,
                updateTodo: false,
                alert: false,
                showInfo: false
              })
            }
          })
        }
      }
    }
  }

  onCancelCreateOrUpdate() {
    if (this.state.newTodo) {
      this.setState({
        ...this.state,
        updateTodo: false,
        todo: this.props.todo
      })
    } else {
      getTodoById(this.state.todo.id).then(todo => {
        this.setState({
          ...this.state,
          updateTodo: false,
          todo: todo
        })

        if (this.state.showInfo) {
          this.todoElement.current.setState({
            ...this.todoElement.current.state,
            todo: this.state.todo
          })
        }
      })
    }
  }

  onShowInfo() {
    this.setState({
      ...this.state,
      showInfo: true
    })
  }

  onDelete() {
    var todoId = this.state.todo.id
    deleteTodo(todoId).then(res => {
      if (res.status <= 201) {
        this.props.removeFromTodoList(todoId)
      }
    })
  }

  onInfoChange(todo) {
    this.setState({
      ...this.state,
      todo: todo
    })
  }

  render() {
    const done = this.state.todo.done

    const checkMark = (
      <div id='checkbox-checkmark' onClick={this.onDoneChange} />
    )

    return (
      <div className='Todo'>
        <div className='todo'>
          <div id='checkbox'>
            <button id='checkbox-button' onClick={this.onDoneChange} />
            {done ? checkMark : null}
          </div>

          <input
            type='text'
            value={this.state.todo.title}
            onChange={this.onTitleChange}
          />

          {this.state.updateTodo ? (
            <div style={{ display: 'flex' }}>
              <button onClick={this.onCreateOrUpdate(this.state.todo)}>
                <i
                  className='far fa-check-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
              <button onClick={this.onCancelCreateOrUpdate}>
                <i
                  className='far fa-times-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
            </div>
          ) : null}

          {!this.state.newTodo ? (
            <button onClick={this.onShowInfo}>
              <i className='fas fa-info-circle' />
            </button>
          ) : null}
        </div>

        {this.state.alert ? (
          <div className='mt-3 alert alert-danger' role='alert'>
            {this.state.warning}
          </div>
        ) : null}

        {this.state.showInfo ? (
          <TodoInfo
            ref={this.todoElement}
            todo={this.state.todo}
            onInfoDoneClick={this.onCreateOrUpdate}
            onDeleteClick={this.onDelete}
            onInfoChange={this.onInfoChange}
          />
        ) : null}
      </div>
    )
  }
}

Todo.propTypes = {
  newTodo: PropTypes.bool.isRequired,
  todo: PropTypes.object.isRequired,
  addToTodoList: PropTypes.func,
  removeFromTodoList: PropTypes.func
}

Todo.defaultProps = {
  newTodo: false
}

export default Todo
