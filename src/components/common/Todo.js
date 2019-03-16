import React from 'react'
import './Todo.scss'
import PropTypes from 'prop-types'
import { createTodo, editTodo } from '../../actions/todoActions'

class Todo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      editTodo: false,
      newTodo: props.newTodo,
      todo: props.todo
    }

    this.onButtonDoneClick = this.onButtonDoneClick.bind(this)
    this.onButtonApproveClick = this.onButtonApproveClick.bind(this)
    this.onButtonCancelNewClick = this.onButtonCancelNewClick.bind(this)
    this.onButtonInfoClick = this.onButtonInfoClick.bind(this)
    this.onChange = this.onChange.bind(this)
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
        if (res.success) {
          this.setState({ ...this.state, editTodo: false })
        }
      })
    } else {
      createTodo(this.state.todo).then(res => {
        if (res.success) {
          this.setState({ ...this.state, editTodo: false, newTodo: false })
        }
      })
    }
  }

  onButtonCancelNewClick() {
    this.setState({
      ...this.state,
      editTodo: false,
      todo: this.props.todo
    })
  }

  onButtonInfoClick() {}

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
            <button onClick={this.onButtonCancelNewClick}>
              <i className='far fa-times-circle' style={{ fontSize: '25px' }} />
            </button>
          </div>
        ) : null}

        {!this.state.newTodo ? (
          <button>
            <i
              className='fas fa-info-circle'
              onClick={this.onButtonInfoClick}
            />
          </button>
        ) : null}
      </div>
    )
  }
}

Todo.propTypes = {
  newTodo: PropTypes.bool,
  todo: PropTypes.object
}

Todo.defaultProps = {
  newTodo: false
}

export default Todo
