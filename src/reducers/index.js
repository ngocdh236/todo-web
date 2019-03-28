import { combineReducers } from 'redux'
import auth from './authReducer'
import errors from './errorsReducer'
import theme from './themeReducer'
import todos from './todosReducer'
import categories from './categoriesReducer'
import todosFilter from './todosFilterReducer'
import todosCategoryFilter from './todosCategoryFilterReducer'

export default combineReducers({
  auth,
  theme,
  errors,
  todos,
  categories,
  todosFilter,
  todosCategoryFilter
})
