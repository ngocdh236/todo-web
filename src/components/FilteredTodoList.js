import { connect } from 'react-redux'

import TodoList from './TodoList'
import { Filters } from '../services'

const getTodos = todos => {
  switch (todos.filter) {
    case Filters.SHOW_ALL:
      return todos.items
    case Filters.SHOW_DONE:
      return todos.items.filter(todo => todo.done)
    case Filters.SHOW_UNDONE:
      return todos.items.filter(todo => !todo.done)
    case Filters.SHOW_DUE_SOON:
      return todos.items.filter(todo => !todo.done && todo.deadline)
    default:
      throw new Error('Unknown filter: ' + todos.filter)
  }
}

const mapStateToProps = state => ({
  todos: getTodos(state.todos)
})

export default connect(mapStateToProps)(TodoList)
