import '../styles/TodoList.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Todo from '../containers/Todo'

class TodoList extends Component {
  render() {
    var todos = this.props.todos.map(todo => {
      return <Todo key={todo.id} todo={todo} />
    })

    return (
      <div className='TodoList'>
        {todos}
        <div className='new-todo'>
          <Todo
            newTodo={true}
            todo={{
              done: false,
              title: ''
            }}
          />
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array
}

export default TodoList
