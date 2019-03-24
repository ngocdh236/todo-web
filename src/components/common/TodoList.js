import React, { Component } from 'react'
import '../../styles/TodoList.scss'
import Todo from '../common/Todo'
import PropTypes from 'prop-types'

class TodoList extends Component {
  render() {
    var todoList = this.props.todoList.map(todo => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          removeFromTodoList={this.props.removeFromTodoList}
        />
      )
    })

    return (
      <div className='TodoList'>
        {todoList}
        <div className='new-todo'>
          <Todo
            newTodo={true}
            todo={{
              done: false,
              title: ''
            }}
            addToTodoList={this.props.addToTodoList}
          />
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  addToTodoList: PropTypes.func,
  removeFromTodoList: PropTypes.func
}

export default TodoList
