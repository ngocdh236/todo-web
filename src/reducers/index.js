import { combineReducers } from 'redux'
import error from './errorReducer'
import notification from './notificationReducer'
import theme from './themeReducer'
import todos from './todosReducer'
import categories from './categoriesReducer'

export default combineReducers({
  theme,
  error,
  notification,
  todos,
  categories
})
