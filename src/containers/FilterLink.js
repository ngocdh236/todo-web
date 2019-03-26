import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/todoActions'
import Category from '../components/Category'
import { VisibilityFilters } from '../actions/todoActions'

const mapStateToProps = (state, ownProps) => {
  switch (state.visibilityFilter.visibilityFilter) {
    case VisibilityFilters.SHOW_BY_CATEGORY:
      return { active: ownProps.category === state.visibilityFilter.category }
    default:
      return {
        active: ownProps.filter === state.visibilityFilter.visibilityFilter
      }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () =>
    dispatch(setVisibilityFilter(ownProps.filter, ownProps.category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
