import { Types } from '../actions'

const initialState = {
  darkMode: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SET_DARK_THEME:
      return {
        ...state,
        darkMode: true
      }
    case Types.SET_LIGHT_THEME:
      return {
        ...state,
        darkMode: false
      }
    default:
      return state
  }
}
