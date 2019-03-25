import React, { Component } from 'react'
import '../../styles/TodoList.scss'
import Todo from '../common/Todo'
import PropTypes from 'prop-types'

class TodoList extends Component {
  render() {
    var todos = this.props.todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          categories={this.props.categories}
          deleteTodo={this.props.deleteTodo}
          updateTodo={this.props.updateTodo}
        />
      )
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
            createTodo={this.props.createTodo}
          />
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  categories: PropTypes.array,
  createTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  updateTodo: PropTypes.func
}

export default TodoList
