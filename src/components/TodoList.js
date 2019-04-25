import '../styles/TodoList.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoLink from '../containers/TodoLink'

class TodoList extends Component {
  render() {
    var todos = this.props.todos.map(todo => {
      return <TodoLink key={todo.id} todo={todo} />
    })

    return (
      <div className='TodoList'>
        {todos}
        <TodoLink
          newTodo={true}
          todo={{
            done: false,
            title: ''
          }}
          categoryId={this.props.categoryId}
          deadline={this.props.deadline}
        />
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  categoryId: PropTypes.number
}

export default TodoList
