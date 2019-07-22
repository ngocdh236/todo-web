import { Filters, Types } from '../services'

const initialState = {
  filter: Filters.SHOW_ALL,
  category: { id: -1, name: 'All', gradientColor: 'white' }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILTER_CATEGORY:
      return { filter: action.filter, category: action.category }
    default:
      return state
  }
}
