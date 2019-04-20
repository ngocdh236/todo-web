import '../styles/NewTodo.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoInfoLink from '../containers/TodoInfoLink'

class NewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: false,
      warning: ''
    }
  }

  render() {
    return (
      <div className='NewTodo d-flex justify-content-center'>
        <div
          className='new-todo-container'
          onClick={this.props.toggleAddNewTodo}
        />
        <TodoInfoLink
          todo={{
            title: '',
            deadline: this.props.deadline
          }}
          newTodo={true}
          cancelNewTodo={this.props.toggleAddNewTodo}
        />
      </div>
    )
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  toggleAddNewTodo: PropTypes.func.isRequired,
  deadline: PropTypes.string
}

export default NewTodo
