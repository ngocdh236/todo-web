import { Types } from './actionTypes'

const initialState = {
  notifications: [],
  message: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.GET_NOTIFICATION:
      if (action.message) {
        return { message: action.message }
      }
      return state
    case Types.REMOVE_NOTIFICATION:
      return initialState
    default:
      return state
  }
}
