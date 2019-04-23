import { connect } from 'react-redux'
import moment from 'moment'

import TodoList from '../components/TodoList'

const getTodos = (todos, date) => {
  return todos.filter(
    todo =>
      moment
        .utc(todo.deadline)
        .startOf('day')
        .format() === date
  )
}

const mapStateToProps = (state, ownProps) => ({
  todos: getTodos(state.todos, ownProps.date)
})

export default connect(mapStateToProps)(TodoList)
