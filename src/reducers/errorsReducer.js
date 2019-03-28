import { Types } from '../actions'

const errors = (state = [], action) => {
  switch (action.type) {
    case Types.GET_ERRORS:
      return action.errors
    default:
      return state
  }
}

export default errors
