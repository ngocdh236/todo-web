import jwt_decoce from 'jwt-decode'

import { customAxios } from './customAxios'
import { Types } from '.'
import { setAuthToken } from './setAuthToken'
import { getTodos } from './todoService'
import { getCategories } from './categoryService'

const signUpURL = '/auth/signup'
const signInURL = '/auth/signin'

export function useAuthService(auth, dispatch) {
  const registerUser = (userData, history) => {
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

  const loginUser = userData => {
    customAxios
      .post(signInURL, userData)
      .then(res => {
        const { accessToken } = res.data
        localStorage.setItem('token', accessToken)
        setAuthToken(accessToken)
        const decoded = jwt_decoce(accessToken)
        dispatch(setCurrentUser(decoded))
        dispatch(getTodos())
        dispatch(getCategories())
      })
      .catch(
        err => console.log(err)
        // dispatch({
        //   type: Types.GET_ERRORS,
        //   payload: err.response.data
        // })
      )
  }

  const setCurrentUser = decoded => {
    return {
      type: Types.SET_CURRENT_USER,
      payload: decoded
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setAuthToken(false)
    dispatch(setCurrentUser(null))
    window.location.href = '/login'
  }

  return { registerUser, loginUser, setCurrentUser, logoutUser }
}
