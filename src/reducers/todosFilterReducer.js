import { Filters, Types } from '../services'

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
