import React from 'react'
import './Todo.scss'
import PropTypes from 'prop-types'
import { createTodo, editTodo, deleteTodo } from '../../actions/todoActions'

class Todo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      editTodo: false,
      newTodo: props.newTodo,
      todo: props.todo,
      showPopup: false
    }

    this.onButtonDoneClick = this.onButtonDoneClick.bind(this)
    this.onButtonApproveClick = this.onButtonApproveClick.bind(this)
    this.onButtonCancelClick = this.onButtonCancelClick.bind(this)
    this.onButtonInfoClick = this.onButtonInfoClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  onChange(e) {
    this.setState({
      ...this.state,
      editTodo: true,
      todo: { ...this.state.todo, title: e.target.value }
    })
    if (e.target.value === this.props.todo.title) {
      this.setState({
        ...this.state,
        editTodo: false,
        todo: { ...this.state.todo, title: this.props.todo.title }
      })
    }
  }

  onButtonDoneClick() {
    this.setState(
      {
        ...this.state,
        todo: { ...this.state.todo, done: !this.state.todo.done }
      },
      () =>
        editTodo(this.state.todo).then(res => {
          if (!res.success) {
            this.setState({
              ...this.state,
              todo: { ...this.state.todo, done: !this.state.todo.done }
            })
          }
        })
    )
  }

  onButtonApproveClick() {
    if (!this.state.newTodo) {
      editTodo(this.state.todo).then(res => {
        if (res.validateStatus) {
          this.setState({ ...this.state, editTodo: false })
        }
      })
    } else {
      createTodo(this.state.todo).then(res => {
        if (res.status <= 201) {
          this.setState(
            { ...this.state, editTodo: false, newTodo: false },
            () => this.props.addTodo(res.data)
          )
          this.setState({
            editTodo: false,
            newTodo: this.props.newTodo,
            todo: this.props.todo
          })
        }
      })
    }
  }

  onButtonCancelClick() {
    this.setState({
      ...this.state,
      editTodo: false,
      todo: this.props.todo
    })
  }

  onButtonInfoClick() {
    this.setState({
      ...this.state,
      showPopup: !this.state.showPopup
    })
  }

  deleteTodo() {
    var todoId = this.state.todo.id
    deleteTodo(todoId).then(res => {
      if (res.status <= 201) {
        this.props.deleteTodo(todoId)
      }
    })
  }

  render() {
    const done = this.state.todo.done

    const checkMark = (
      <div id='checkbox-checkmark' onClick={this.onButtonDoneClick} />
    )

    return (
      <div className='Todo'>
        <div id='checkbox'>
          <button id='checkbox-button' onClick={this.onButtonDoneClick} />
          {done ? checkMark : null}
        </div>

        <input
          type='text'
          className='inputField'
          value={this.state.todo.title}
          onChange={this.onChange}
        />

        {this.state.editTodo ? (
          <div style={{ display: 'flex' }}>
            <button onClick={this.onButtonApproveClick}>
              <i className='far fa-check-circle' style={{ fontSize: '25px' }} />
            </button>
            <button onClick={this.onButtonCancelClick}>
              <i className='far fa-times-circle' style={{ fontSize: '25px' }} />
            </button>
          </div>
        ) : null}

        {!this.state.newTodo ? (
          <button onClick={this.onButtonInfoClick}>
            <i className='fas fa-info-circle' />
          </button>
        ) : null}

        {this.state.showPopup ? (
          <Popup
            closePopup={this.onButtonInfoClick}
            deleteTodo={this.deleteTodo}
          />
        ) : null}
      </div>
    )
  }
}

Todo.propTypes = {
  newTodo: PropTypes.bool.isRequired,
  todo: PropTypes.object.isRequired,
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func
}

Todo.defaultProps = {
  newTodo: false
}

export default Todo

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <button onClick={this.props.closePopup} className='btn btn-light'>
            Done
          </button>
          <button onClick={this.props.deleteTodo} className='btn btn-light'>
            Delete
          </button>
        </div>
      </div>
    )
  }
}
