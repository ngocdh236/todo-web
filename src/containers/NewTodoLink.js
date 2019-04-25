import { connect } from 'react-redux'
import { createTodo } from '../actions/todoActions'
import NewTodo from '../components/NewTodo'

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo))
})

export default connect(
  null,
  mapDispatchToProps
)(NewTodo)
