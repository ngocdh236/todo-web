import '../styles/TodoList.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoLink from './TodoLink'
import NewTodoLink from './NewTodoLink'

class TodoList extends Component {
  render() {
    var todos = this.props.todos.map(todo => {
      return <TodoLink key={todo.id} todo={todo} />
    })

    return (
      <div className='TodoList'>
        {todos}
        <NewTodoLink
          todo={{
            title: '',
            categoryId:
              this.props.categoryId && this.props.categoryId >= 0
                ? this.props.categoryId
                : null,
            deadline: this.props.deadline
          }}
        />
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  categoryId: PropTypes.number,
  deadline: PropTypes.object
}

export default TodoList
