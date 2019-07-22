import { Types } from '../services'

const todos = (state = [], action) => {
  switch (action.type) {
    case Types.SET_TODOS:
      return action.todos
    case Types.CREATE_TODO:
      return [...state, action.todo]
    case Types.DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case Types.UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      )
    default:
      return state
  }
}

export default todos
