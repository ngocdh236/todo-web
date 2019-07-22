import { connect } from 'react-redux'
import moment from 'moment'

import TodoList from './TodoList'

const getTodos = (todos, date) => {
  return todos.filter(
    todo =>
      moment(todo.deadline)
        .startOf('day')
        .format() ===
      moment(date)
        .startOf('day')
        .format()
  )
}

const mapStateToProps = (state, ownProps) => ({
  todos: getTodos(state.todos, ownProps.date),
  deadline: ownProps.date
})

export default connect(mapStateToProps)(TodoList)
