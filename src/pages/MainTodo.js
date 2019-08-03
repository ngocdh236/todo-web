import '../styles/MainTodo.scss'

import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import TodoList from '../components/TodoList'
import FilterCard from '../components/FilterCard'
import { Filters } from '../utils/todoFilters'

export default function MainTodo(props) {
  const { data, todoService } = useContext(DataContext)

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

  const handleSetFilter = filter => {
    todoService.setFilter(filter)
  }

  return (
    <div className='MainTodo'>
      <div className='header d-flex'>
        <FilterCard
          category={{
            name: 'All',
            gradientColor: 'var(--background-primary)'
          }}
          icon=''
          isActive={data.filter === Filters.SHOW_ALL}
          onClick={() => handleSetFilter(Filters.SHOW_ALL)}
        />
        <FilterCard
          category={{
            name: 'Done',
            gradientColor: 'linear-gradient(to right, #a8e063, #56ab2f)'
          }}
          icon='far fa-check-circle'
          isActive={data.filter === Filters.SHOW_DONE}
          onClick={() => handleSetFilter(Filters.SHOW_DONE)}
        />
        <FilterCard
          category={{
            name: 'Due Soon',
            gradientColor: 'linear-gradient(to right, #ef473a, #cb2d3e)'
          }}
          icon='far fa-clock'
          isActive={data.filter === Filters.SHOW_DUE_SOON}
          onClick={() => handleSetFilter(Filters.SHOW_DUE_SOON)}
        />
        <FilterCard
          category={{
            name: 'Todo',
            gradientColor: 'linear-gradient(to right, #ffe259, #ffcc33)'
          }}
          icon='far fa-times-circle'
          isActive={data.filter === Filters.SHOW_UNDONE}
          onClick={() => handleSetFilter(Filters.SHOW_UNDONE)}
        />
      </div>
      <TodoList
        todos={todos}
        todoService={todoService}
        categories={data.categories}
      />
    </div>
  )
}
