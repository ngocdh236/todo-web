import { Types } from '../services'

const categories = (state = [], action) => {
  switch (action.type) {
    case Types.SET_CATEGORIES:
      return action.categories
    case Types.CREATE_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}

export default categories
