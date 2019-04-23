import { connect } from 'react-redux'
import { createTodo, updateTodo } from '../actions/todoActions'
import Todo from '../components/Todo'

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo))
})

export default connect(
  null,
  mapDispatchToProps
)(Todo)
