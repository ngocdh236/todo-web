import { connect } from 'react-redux'
import { setFilterCategory } from '../services/todoService'
import Category from '../components/Category'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.category.id === state.todosCategoryFilter.category.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setFilterCategory(ownProps.filter, ownProps.category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
