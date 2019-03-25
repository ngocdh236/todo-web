import { SET_CATEGORIES, CREATE_CATEGORY } from '../actions/types'

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    case CREATE_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}

export default categories