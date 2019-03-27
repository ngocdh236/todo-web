import { Filters } from '../actions'
import { Types } from '../actions'

const initialState = {
  filter: Filters.SHOW_ALL
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILTER:
      return { filter: action.filter }
    default:
      return state
  }
}
