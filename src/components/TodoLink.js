import { connect } from 'react-redux'
import { updateTodo } from '../services/todoService'
import Todo from './Todo'

const mapDispatchToProps = dispatch => ({
  updateTodo: todo => dispatch(updateTodo(todo))
})

export default connect(
  null,
  mapDispatchToProps
)(Todo)
