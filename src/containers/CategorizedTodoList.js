import { connect } from 'react-redux'

import TodoList from '../components/TodoList'
import { Filters } from '../actions'

const getTodos = (todos, todosCategoryFilter) => {
  switch (todosCategoryFilter.filter) {
    case Filters.SHOW_ALL:
      return todos
    case Filters.SHOW_BY_CATEGORY:
      return todos.filter(todo => {
        if (todo.category)
          return todo.category.id === todosCategoryFilter.category.id
        return null
      })
    default:
      throw new Error('Unknown filter: ' + todosCategoryFilter.filter)
  }
}

const mapStateToProps = state => ({
  todos: getTodos(state.todos, state.todosCategoryFilter),
  categoryId: state.todosCategoryFilter.category.id
})

export default connect(mapStateToProps)(TodoList)
