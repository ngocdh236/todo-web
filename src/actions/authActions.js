import axios from 'axios'
import { GET_ERRORS } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decoce from 'jwt-decode'
import { SET_CURRENT_USER } from '../actions/types'

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/signup', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/signin', userData)
    .then(res => {
      const { accessToken } = res.data
      localStorage.setItem('token', accessToken)
      setAuthToken(accessToken)
      const decoded = jwt_decoce(accessToken)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  window.location.href = '/login'
}
