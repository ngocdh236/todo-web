import { connect } from 'react-redux'

import TodoList from '../components/TodoList'

const getTodos = (todos, date) => {
  return todos.filter(todo => todo.deadline == date)
}

const mapStateToProps = state => ({
  todos: getTodos(state.todos, state.date)
})

export default connect(mapStateToProps)(TodoList)
