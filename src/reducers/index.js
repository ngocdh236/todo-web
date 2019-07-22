import { combineReducers } from 'redux'
import error from './errorReducer'
import notification from './notificationReducer'
import todos from './todosReducer'
import categories from './categoriesReducer'

export default combineReducers({
  error,
  notification,
  todos,
  categories
})
