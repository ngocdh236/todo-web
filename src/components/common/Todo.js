import React from 'react'
import '../../styles/Todo.scss'
import PropTypes from 'prop-types'
import { createTodo, updateTodo, deleteTodo } from '../../actions/todoActions'
import TodoInfo from './TodoInfo'

class Todo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      newTodo: props.newTodo,
      todo: props.todo,
      updateTodo: false,
      showInfo: false
    }

    this.onDoneChange = this.onDoneChange.bind(this)
    this.createOrUpdate = this.createOrUpdate.bind(this)
    this.cancelCreateOrUpdate = this.cancelCreateOrUpdate.bind(this)
    this.showInfo = this.showInfo.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.delete = this.delete.bind(this)
  }

  onTitleChange(e) {
    this.setState({
      ...this.state,
      updateTodo: true,
      todo: { ...this.state.todo, title: e.target.value }
    })

    // TODO: change updateTodo to false if title remains the same
  }

  onDoneChange() {
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

  createOrUpdate() {
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
            todo: this.props.todo
          })
        }
      })
    } else {
      updateTodo(this.state.todo).then(res => {
        if (res.data.success) {
          this.setState({ ...this.state, updateTodo: false })
        }
      })
    }
  }

  cancelCreateOrUpdate() {
    this.setState({
      ...this.state,
      updateTodo: false,
      todo: this.props.todo
    })
  }

  showInfo() {
    this.setState({
      ...this.state,
      showInfo: !this.state.showInfo
    })
  }

  delete() {
    var todoId = this.state.todo.id
    deleteTodo(todoId).then(res => {
      if (res.status <= 201) {
        this.props.removeFromTodoList(todoId)
      }
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
              <button onClick={this.createOrUpdate}>
                <i
                  className='far fa-check-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
              <button onClick={this.cancelCreateOrUpdate}>
                <i
                  className='far fa-times-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
            </div>
          ) : null}

          {!this.state.newTodo ? (
            <button onClick={this.showInfo}>
              <i className='fas fa-info-circle' />
            </button>
          ) : null}
        </div>
        {this.state.showInfo ? (
          <TodoInfo
            todo={this.state.todo}
            onDoneClick={this.showInfo}
            onDeleteClick={this.delete}
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
