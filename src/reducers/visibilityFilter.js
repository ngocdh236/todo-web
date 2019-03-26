import { VisibilityFilters } from '../actions/todoActions'
import { SET_VISIBILITY_FILTER } from '../actions/types'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  category: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return { visibilityFilter: action.filter, category: action.category }
    default:
      return state
  }
}

