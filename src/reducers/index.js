import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import themeReducer from './themeReducer'

export default combineReducers({
  auth: authReducer,
  theme: themeReducer,
  errors: errorReducer
})
