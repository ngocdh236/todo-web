import '../styles/MainTodo.scss'

import React, { Component } from 'react'

import FilteredTodoList from '../containers/FilteredTodoList'
import FilterLink from '../containers/FilterLink'
import { Filters } from '../actions'

class MainTodo extends Component {
  render() {
    const header = (
      <div className='header d-flex'>
        <FilterLink
          category={{ id: -1, name: 'All', gradientColor: 'white' }}
          icon=''
          filter={Filters.SHOW_ALL}
        />
        <FilterLink
          category={{
            id: -2,
            name: 'Done',
            gradientColor: 'linear-gradient(to right, #a8e063, #56ab2f)'
          }}
          icon='far fa-check-circle'
          filter={Filters.SHOW_DONE}
        />
        <FilterLink
          category={{
            id: -3,
            name: 'Due Soon',
            gradientColor: 'linear-gradient(to right, #ef473a, #cb2d3e)'
          }}
          icon='far fa-clock'
          filter={Filters.SHOW_DUE_SOON}
        />
        <FilterLink
          category={{
            id: -4,
            name: 'Todo',
            gradientColor: 'linear-gradient(to right, #ffe259, #ffcc33)'
          }}
          icon='far fa-times-circle'
          filter={Filters.SHOW_UNDONE}
        />
      </div>
    )
    return (
      <div className='MainTodo'>
        {header}
        <FilteredTodoList />
      </div>
    )
  }
}

export default MainTodo
