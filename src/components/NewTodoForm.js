import '../styles/NewTodoForm.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoInfoLink from './TodoInfoLink'

class NewTodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: false,
      warning: ''
    }
  }

  render() {
    return (
      <div className='NewTodoForm d-flex justify-content-center'>
        <div
          className='new-todo-container'
          onClick={this.props.toggleAddNewTodo}
        />
        <TodoInfoLink
          todo={{
            title: '',
            deadline: this.props.deadline,
            category:
              this.props.category && this.props.category.id >= 0
                ? this.props.category
                : null
          }}
          newTodo={true}
          cancelNewTodo={this.props.toggleAddNewTodo}
        />
      </div>
    )
  }
}

NewTodoForm.propTypes = {
  toggleAddNewTodo: PropTypes.func.isRequired,
  deadline: PropTypes.object,
  category: PropTypes.object
}

NewTodoForm.defaultProps = {
  toggleAddNewTodo: false
}

export default NewTodoForm
