import { connect } from 'react-redux'

import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions/todoActions'
import isEmpty from '../validation/is-empty'

const getVisibleTodos = (todos, filter) => {
  switch (filter.visibilityFilter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_DONE:
      return todos.filter(todo => todo.done)
    case VisibilityFilters.SHOW_TODO:
      return todos.filter(todo => !todo.done)
    case VisibilityFilters.SHOW_DUE_SOON:
      return todos.filter(todo => !isEmpty(todo.deadline))
    case VisibilityFilters.SHOW_BY_CATEGORY:
      return todos.filter(todo => {
        if (todo.category) return todo.category.id === filter.category.id
      })
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

export default connect(mapStateToProps)(TodoList)
