import { Types } from '../actions'

const initialState = {
  errors: [],
  message: ''
}

export default function(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case Types.GET_ERRORS:
      if (action.payload.errors) {
        return { errors: action.payload.errors }
      }
      if (action.payload.message) {
        return { message: action.payload.message }
      }
      return state
    default:
      return state
  }
}
