import { connect } from 'react-redux'
import { updateTodo } from '../actions/todoActions'
import Todo from '../components/Todo'

const mapDispatchToProps = dispatch => ({
  updateTodo: todo => dispatch(updateTodo(todo))
})

const mapStateToProps = state => ({
  todos: state.todos
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
