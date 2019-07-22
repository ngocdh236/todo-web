import { connect } from 'react-redux'
import { setFilter } from '../services/todoService'
import Category from '../components/Category'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.todos.filter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
