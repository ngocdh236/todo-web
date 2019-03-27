import { combineReducers } from 'redux'
import auth from './authReducer'
import error from './errorReducer'
import theme from './themeReducer'
import todos from './todosReducer'
import categories from './categoriesReducer'
import todosFilter from './todosFilterReducer'
import todosCategoryFilter from './todosCategoryFilterReducer'

export default combineReducers({
  auth,
  theme,
  errors: error,
  todos,
  categories,
  todosFilter,
  todosCategoryFilter
})
