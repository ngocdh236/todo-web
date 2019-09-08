import '../styles/TodoList.scss'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Todo from './Todo'

export default function TodoList(props) {
  const [todos, setTodos] = useState(
    props.todos.map(todo => ({ ...todo, selected: false }))
  )
  const [isEditing, setIsEditing] = useState(false)
  const selectedTodosNumber = todos.filter(todo => todo.selected === true)
    .length

  const handleSelectTodo = todoId => {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoId) {
          todo.selected = !todo.selected
          return todo
        }
        return todo
      })
    )
  }

  const handleSelectAllTodos = all => {
    setTodos(todos.map(todo => ({ ...todo, selected: all })))
  }

  const handleCancelSelectTodo = () => {
    handleSelectAllTodos(false)
    setIsEditing(false)
  }

  const handleDeleteSelectedTodos = () => {
    todos.forEach(todo => {
      if (todo.selected) props.todoService.remove(todo.id)
    })
  }

  const todoItems = todos.map(todo => (
    <Todo
      key={todo.id}
      isEditing={isEditing}
      handleSelectTodo={handleSelectTodo}
      todo={todo}
      categories={props.categories}
      todoService={props.todoService}
    />
  ))

  return (
    <div className='TodoList'>
      {!isEditing && (
        <div className='d-flex justify-content-end mb-4'>
          <button className='button-edit' onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
      {isEditing && (
        <div className='d-flex justify-content-between mb-5'>
          <button
            className='button-danger'
            disabled={selectedTodosNumber === 0}
            onClick={() => handleDeleteSelectedTodos()}
          >
            Delete ({selectedTodosNumber})
          </button>
          <button
            className='button-danger-secondary'
            disabled={selectedTodosNumber === todos.length}
            onClick={() => handleSelectAllTodos(true)}
          >
            Select All
          </button>
          <button
            className='button-warning'
            disabled={selectedTodosNumber === 0}
            onClick={() => handleSelectAllTodos(false)}
          >
            Undo Selected ({selectedTodosNumber})
          </button>
          <button
            className='button-light'
            onClick={() => handleCancelSelectTodo()}
          >
            Cancel
          </button>
        </div>
      )}

      {todoItems}
      <Todo
        isNewTodo={true}
        isEditing={isEditing}
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
  deadline: PropTypes.object,
  todoService: PropTypes.object
}
