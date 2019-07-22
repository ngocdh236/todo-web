import { connect } from 'react-redux'

import TodoList from '../components/TodoList'
import { Filters } from '../services'

const getTodos = todos => {
  switch (todos.category.filter) {
    case Filters.SHOW_ALL:
      return todos.items
    case Filters.SHOW_BY_CATEGORY:
      return todos.items.filter(todo => {
        if (todo.category) return todo.category === todos.category.item
        return null
      })
    default:
      throw new Error('Unknown filter: ' + todos.category.filter)
  }
}

const mapStateToProps = state => ({
  todos: getTodos(state.todos),
  categoryId: state.todos.category.item.id
})

export default connect(mapStateToProps)(TodoList)
