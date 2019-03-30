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
    .then(res => {
      dispatch({
        type: Types.GET_NOTIFICATION,
        message: res.data.message
      })
      history.push('/login')
    })
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    )
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
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    )
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
