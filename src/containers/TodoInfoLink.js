import { connect } from 'react-redux'
import { deleteTodo } from '../actions/todoActions'
import TodoInfo from '../components/TodoInfo'

const mapStateToProps = (state) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
    deleteTodo: (todoId) => dispatch(deleteTodo(todoId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoInfo)
