import { connect } from 'react-redux'
import { createTodo, updateTodo, deleteTodo } from '../actions/todoActions'
import TodoInfo from '../components/TodoInfo'

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo)),
  deleteTodo: todoId => dispatch(deleteTodo(todoId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInfo)
