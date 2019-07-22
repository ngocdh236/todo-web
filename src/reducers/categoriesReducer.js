import { Types } from '../services'

const categories = (state = [], action) => {
  switch (action.type) {
    case Types.SET_CATEGORIES:
      return action.payload
    case Types.CREATE_CATEGORY:
      return [...state, action.payload]
    default:
      return state
  }
}

export default categories
