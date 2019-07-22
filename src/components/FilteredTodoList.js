import { connect } from 'react-redux'

import TodoList from './TodoList'
import { Filters } from '../services'

const getTodos = (todos, todosFilter) => {
  switch (todosFilter.filter) {
    case Filters.SHOW_ALL:
      return todos
    case Filters.SHOW_DONE:
      return todos.filter(todo => todo.done)
    case Filters.SHOW_UNDONE:
      return todos.filter(todo => !todo.done)
    case Filters.SHOW_DUE_SOON:
      return todos.filter(todo => !todo.done && todo.deadline)
    default:
      throw new Error('Unknown filter: ' + todosFilter.filter)
  }
}

const mapStateToProps = state => ({
  todos: getTodos(state.todos, state.todosFilter)
})

export default connect(mapStateToProps)(TodoList)
