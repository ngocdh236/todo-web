import jwt_decoce from 'jwt-decode'

import { customAxios } from './customAxios'
import { Types } from '../reducers/actionTypes'
import { setAuthToken } from './setAuthToken'

const signUpURL = '/auth/signup'
const signInURL = '/auth/signin'

export function useAuthService(auth, dispatch) {
  const register = (userData, history) => {
    customAxios
      .post(signUpURL, userData)
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
      .catch(
        err => console.log(err)
        // dispatch({
        //   type: Types.GET_ERRORS,
        //   payload: err.response.data
        // })
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
    setUser(null)
    window.location.href = '/login'
  }

  return { register, login, setUser, logout }
}
