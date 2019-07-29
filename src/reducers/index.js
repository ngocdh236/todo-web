import { combineReducers } from 'redux'
import error from './errorReducer'
import notification from './notificationReducer'

export default combineReducers({
  error,
  notification
})
