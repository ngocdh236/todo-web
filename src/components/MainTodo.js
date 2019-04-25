import '../styles/MainTodo.scss'

import React, { Component } from 'react'

import FilteredTodoList from '../containers/FilteredTodoList'
import FilterLink from '../containers/FilterLink'
import { Filters } from '../actions'

import NewTodoForm from '../components/NewTodoForm'

class MainTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addNewTodo: false
    }

    this.toggleAddNewTodo = this.toggleAddNewTodo.bind(this)
  }

  toggleAddNewTodo() {
    this.setState({
      ...this.state,
      addNewTodo: !this.state.addNewTodo
    })
  }

  render() {
    const header = (
      <div className='header d-flex'>
        <FilterLink
          category={{ name: 'All', gradientColor: 'white' }}
          icon=''
          filter={Filters.SHOW_ALL}
        />
        <FilterLink
          category={{
            name: 'Done',
            gradientColor: 'linear-gradient(to right, #a8e063, #56ab2f)'
          }}
          icon='far fa-check-circle'
          filter={Filters.SHOW_DONE}
        />
        <FilterLink
          category={{
            name: 'Due Soon',
            gradientColor: 'linear-gradient(to right, #ef473a, #cb2d3e)'
          }}
          icon='far fa-clock'
          filter={Filters.SHOW_DUE_SOON}
        />
        <FilterLink
          category={{
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
        <button className='btn btn-light mb-4' onClick={this.toggleAddNewTodo}>
          + New Todo
        </button>
        {header}
        <FilteredTodoList />
        {this.state.addNewTodo ? (
          <NewTodoForm toggleAddNewTodo={this.toggleAddNewTodo} />
        ) : null}
      </div>
    )
  }
}

export default MainTodo
