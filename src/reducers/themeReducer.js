import { SET_DARK_THEME, SET_LIGHT_THEME } from '../actions/types'

const initialState = {
  darkMode: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DARK_THEME:
      return {
        ...state,
        darkMode: true
      }
    case SET_LIGHT_THEME:
      return {
        ...state,
        darkMode: false
      }
    default:
      return state
  }
}
