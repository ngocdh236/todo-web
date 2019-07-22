import { Filters, Types } from '../services'

const initialState = {
  filter: Filters.SHOW_ALL,
  category: {
    filter: Filters.SHOW_ALL,
    item: {
      id: -1,
      name: 'All',
      gradientColor: 'white'
    }
  },
  items: []
}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_TODOS:
      return { ...state, items: action.payload }
    case Types.CREATE_TODO:
      return { ...state, items: [...state.items, action.payload] }
    case Types.DELETE_TODO:
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.payload)
      }
    case Types.UPDATE_TODO:
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      }
    case Types.SET_FILTER:
      return { ...state, filter: action.payload }
    case Types.SET_FILTER_CATEGORY:
      return {
        ...state,
        category: {
          filter: action.payload.filter,
          item: action.payload.category
        }
      }
    default:
      return state
  }
}

export default todos
