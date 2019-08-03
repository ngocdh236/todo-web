import '../styles/TodoList.scss'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Todo from './Todo'

export default function TodoList(props) {
  const [todos, setTodos] = useState(props.todos)

  useEffect(() => {
    setTodos(props.todos)
  }, [props.todos])

  const todoItems = todos.map(todo => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        categories={props.categories}
        todoService={props.todoService}
      />
    )
  })

  return (
    <div className='TodoList'>
      {todoItems}
      <Todo
        isNewTodo={true}
        todo={{
          title: '',
          categoryId: props.categoryId > 0 ? props.categoryId : null,
          deadline: props.deadline
        }}
        todoService={props.todoService}
        categories={props.categories}
      />
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  categories: PropTypes.array,
  categoryId: PropTypes.number,
  deadline: PropTypes.object
}
