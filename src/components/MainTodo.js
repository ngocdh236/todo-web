import '../styles/MainTodo.scss'

import React, { Component } from 'react'

import FilteredTodoList from '../containers/FilteredTodoList'
import FilteredTodoLink from '../containers/FilteredTodoLink'
import { Filters } from '../actions'

class MainTodo extends Component {
  render() {
    const header = (
      <div className='header d-flex'>
        <FilteredTodoLink
          category={{ id: -1, name: 'All', gradientColor: 'white' }}
          icon=''
          filter={Filters.SHOW_ALL}
        />
        <FilteredTodoLink
          category={{ id: -2, name: 'Done', gradientColor: '#417505' }}
          icon='far fa-check-circle'
          filter={Filters.SHOW_DONE}
        />
        <FilteredTodoLink
          category={{ id: -3, name: 'Due Soon', gradientColor: '#D0021B' }}
          icon='far fa-clock'
          filter={Filters.SHOW_DUE_SOON}
        />
        <FilteredTodoLink
          category={{ id: -4, name: 'Todo', gradientColor: '#F8E71C' }}
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
