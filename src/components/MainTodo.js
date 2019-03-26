import '../styles/MainTodo.scss'

import React, { Component } from 'react'

import VisibleTodoList from '../containers/VisibleTodoList'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions/todoActions'

class MainTodo extends Component {
  render() {
    const header = (
      <div className='header d-flex'>
        <FilterLink
          category={{ id: 0, name: 'All', gradientColor: 'white' }}
          icon=''
          filter={VisibilityFilters.SHOW_ALL}
        />
        <FilterLink
          category={{ id: 1, name: 'Done', gradientColor: '#417505' }}
          icon='far fa-check-circle'
          filter={VisibilityFilters.SHOW_DONE}
        />
        <FilterLink
          category={{ id: 2, name: 'Due Soon', gradientColor: '#D0021B' }}
          icon='far fa-clock'
          filter={VisibilityFilters.SHOW_DUE_SOON}
        />
        <FilterLink
          category={{ id: 3, name: 'Todo', gradientColor: '#F8E71C' }}
          icon='far fa-times-circle'
          filter={VisibilityFilters.SHOW_TODO}
        />
      </div>
    )
    return (
      <div className='MainTodo'>
        {header}
        <VisibleTodoList />
      </div>
    )
  }
}

export default MainTodo