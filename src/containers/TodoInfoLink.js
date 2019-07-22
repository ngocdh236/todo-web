import { connect } from 'react-redux'
import { createTodo, updateTodo, deleteTodo } from '../services/todoService'
import TodoInfo from '../components/TodoInfo'

const mapStateToProps = (state, ownProps) => ({
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
