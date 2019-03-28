import axios from 'axios'
import jwt_decoce from 'jwt-decode'

import { Types } from '.'
import setAuthToken from '../utils/setAuthToken'
import { getTodos } from '../actions/todoActions'
import { getCategories } from '../actions/categoryActions'

const signUpUrl = '/api/auth/signup'
const signInUrl = '/api/auth/signin'

export const registerUser = (userData, history) => dispatch => {
  axios
    .post(signUpUrl, userData)
    .then(res => history.push('/login'))
    .catch(err => {
      if (err.response.data.errors)
        dispatch({
          type: Types.GET_ERRORS,
          errors: err.response.data.errors
        })
    })
}

export const loginUser = userData => dispatch => {
  axios
    .post(signInUrl, userData)
    .then(res => {
      const { accessToken } = res.data
      localStorage.setItem('token', accessToken)
      setAuthToken(accessToken)
      const decoded = jwt_decoce(accessToken)
      dispatch(setCurrentUser(decoded))
      dispatch(getTodos())
      dispatch(getCategories())
    })
    .catch(err => {
      if (err.response.data.errors)
        dispatch({
          type: Types.GET_ERRORS,
          errors: err.response.data.errors
        })
    })
}

export const setCurrentUser = decoded => {
  return {
    type: Types.SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  window.location.href = '/login'
}
