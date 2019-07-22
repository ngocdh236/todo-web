import { connect } from 'react-redux'
import { createTodo } from '../services/todoService'
import NewTodo from '../components/NewTodo'

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo))
})

export default connect(
  null,
  mapDispatchToProps
)(NewTodo)
