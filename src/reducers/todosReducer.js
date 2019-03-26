import {
  SET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from '../actions/types'

const todos = (state = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos
    case CREATE_TODO:
      return [...state, action.todo]
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      )
    default:
      return state
  }
}

export default todos
