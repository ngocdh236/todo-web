import { combineReducers } from 'redux'
import auth from './authReducer'
import error from './errorReducer'
import theme from './themeReducer'
import todos from './todosReducer'
import categories from './categoriesReducer'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  auth: auth,
  theme: theme,
  errors: error,
  todos,
  categories: categories,
  visibilityFilter
})
