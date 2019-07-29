import '../styles/TodoList.scss'

import React from 'react'
import PropTypes from 'prop-types'

import Todo from './Todo'
import NewTodo from './NewTodo'

export default function TodoList(props) {
  const todos = props.todos.map(todo => {
    return <Todo key={todo.id} todo={todo} todoService={props.todoService} />
  })

  return (
    <div className='TodoList'>
      {todos}
      <NewTodo
        todo={{
          title: ''
          // categoryId:
          //   props.categoryId && props.categoryId >= 0 ? props.categoryId : null,
          // deadline: props.deadline
        }}
        todoService={props.todoService}
      />
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  categoryId: PropTypes.number,
  deadline: PropTypes.object
}
