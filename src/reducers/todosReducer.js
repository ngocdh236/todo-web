import isEmpty from '../validation/is-empty'
import {
  SET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  CATEGORY,
  DONE,
  TODO,
  DUE_SOON
} from '../actions/types'

const initialState = {
  all: [],
  filtered: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, all: action.todos }
    case CREATE_TODO:
      return { ...state, all: [...state.all, action.todo] }
    case DELETE_TODO:
      return { ...state, all: state.all.filter(todo => todo.id !== action.id) }
    case UPDATE_TODO:
      return {
        ...state,
        all: state.all.map(todo =>
          todo.id === action.todo.id ? action.todo : todo
        )
      }
    case CATEGORY:
      return {
        ...state,
        filtered: state.all.filter(todo => {
          if (todo.category) return todo.category.id === action.id
        })
      }
    case DONE:
      return {
        ...state,
        filtered: state.all.filter(todo => todo.done)
      }
    case TODO:
      return {
        ...state,
        filtered: state.all.filter(todo => !todo.done)
      }
    case DUE_SOON:
      return {
        ...state,
        filtered: state.all.filter(todo => !isEmpty(todo.deadline))
      }
    default:
      return state
  }
}
