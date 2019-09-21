import jwt_decoce from 'jwt-decode'

import { customAxios, setAuthToken } from './customAxios'
import { Types } from '../reducers/actionTypes'

const signUpURL = '/auth/signup'
const signInURL = '/auth/signin'

export function useAuthService(auth, dispatch) {
  const register = (userData, history) => {
    customAxios
      .post(signUpURL, userData)
      .then(res => {
        history.push('/login')
      })
      .catch(err =>
        dispatch({ type: Types.SET_ERRORS, error: err.response.data })
      )
  }

  const login = userData => {
    customAxios
      .post(signInURL, userData)
      .then(res => {
        const { accessToken } = res.data
        localStorage.setItem('token', accessToken)
        setAuthToken(accessToken)
        const user = jwt_decoce(accessToken)
        setUser(user)
      })
      .catch(err =>
        dispatch({ type: Types.SET_ERRORS, error: err.response.data })
      )
  }

  const setUser = user => {
    dispatch({
      type: Types.SET_USER,
      user
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthToken(false)
    window.location.href = '/login'
  }

  const removeErrors = () => {
    dispatch({
      type: Types.REMOVE_ERRORS
    })
  }

  return { register, login, setUser, logout, removeErrors }
}
