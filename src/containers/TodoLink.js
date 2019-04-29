import { connect } from 'react-redux'
import { updateTodo } from '../actions/todoActions'
import Todo from '../components/Todo'

const mapDispatchToProps = dispatch => ({
  updateTodo: todo => dispatch(updateTodo(todo))
})

export default connect(
  null,
  mapDispatchToProps
)(Todo)
