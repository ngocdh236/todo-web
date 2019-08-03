import { Types } from './actionTypes'
import { Filters } from '../utils/todoFilters'

export const initialState = {
  todos: [],
  categories: [],
  filter: Filters.SHOW_ALL,
  categoryFilter: {
    fitler: Filters.SHOW_ALL,
    category: { id: -1, name: 'All' }
  },
  dateFilter: {}
}

export function reducer(state = initialState, action) {
  const {
    todos,
    todo,
    todoId,
    categories,
    category,
    filter,
    categoryFilter,
    dateFilter
  } = action
  switch (action.type) {
    case Types.SET_TODOS:
      return { ...state, todos }
    case Types.CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, todo]
      }
    case Types.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todoItem =>
          todoItem.id === todo.id ? todo : todoItem
        )
      }
    case Types.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todoItem => todoItem.id !== todoId)
      }

    case Types.SET_CATEGORIES:
      return { ...state, categories }
    case Types.CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, category] }

    case Types.SET_FILTER:
      return { ...state, filter }
    case Types.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter }
    case Types.SET_DATE_FILTER:
      return { ...state, dateFilter }

    default:
      return state
  }
}
