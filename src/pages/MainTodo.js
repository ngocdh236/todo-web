import '../styles/MainTodo.scss'

import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../contexts/DataContext'
import TodoList from '../components/TodoList'
import NewTodoForm from '../components/NewTodoForm'
import FilterCard from '../components/FilterCard'
import { Filters } from '../utils/todoFilters'

export default function MainTodo(props) {
  const { data, todoService } = useContext(DataContext)
  const [addNewTodo, setAddNewTodo] = useState(false)

  let todos = data.todos
  switch (data.filter) {
    case Filters.SHOW_DONE:
      todos = data.todos.filter(todoItem => todoItem.done)
      break
    case Filters.SHOW_DUE_SOON:
      todos = data.todos.filter(todoItem => !todoItem.done && todoItem.deadline)
      break
    case Filters.SHOW_UNDONE:
      todos = data.todos.filter(todoItem => !todoItem.done)
      break
    default:
      todos = data.todos
  }

  const toggleAddNewTodo = () => {
    setAddNewTodo(!addNewTodo)
  }

  useEffect(() => {
    todoService.getAll()
  }, [])

  const header = (
    <div className='header d-flex'>
      <FilterCard
        name='All'
        gradientColor='var(--background-primary)'
        icon=''
        active={data.filter === Filters.SHOW_ALL}
        onClick={() => todoService.setFilter(Filters.SHOW_ALL)}
      />
      <FilterCard
        name='Done'
        gradientColor='linear-gradient(to right, #a8e063, #56ab2f)'
        icon='far fa-check-circle'
        active={data.filter === Filters.SHOW_DONE}
        onClick={() => todoService.setFilter(Filters.SHOW_DONE)}
      />
      <FilterCard
        name='Due Soon'
        gradientColor='linear-gradient(to right, #ef473a, #cb2d3e)'
        icon='far fa-clock'
        active={data.filter === Filters.SHOW_DUE_SOON}
        onClick={() => todoService.setFilter(Filters.SHOW_DUE_SOON)}
      />
      <FilterCard
        name='Todo'
        gradientColor='linear-gradient(to right, #ffe259, #ffcc33)'
        icon='far fa-times-circle'
        active={data.filter === Filters.SHOW_UNDONE}
        onClick={() => todoService.setFilter(Filters.SHOW_UNDONE)}
      />
    </div>
  )

  return (
    <div className='MainTodo'>
      <div className='d-flex justify-content-end'>
        <button className='button-light mb-4' onClick={toggleAddNewTodo}>
          + New Todo
        </button>
      </div>
      {header}
      <TodoList todos={todos} todoService={todoService} />
      {addNewTodo ? <NewTodoForm toggleAddNewTodo={toggleAddNewTodo} /> : null}
    </div>
  )
}
