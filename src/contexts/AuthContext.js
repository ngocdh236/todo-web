import React, { createContext, useReducer } from 'react'

import { Types } from '../reducers/actionTypes'
import { isEmpty } from '../utils/isEmpty'
import { useAuthService } from '../services/authService'

const initialState = {
  isAuthenticated: false,
  user: {},
  inputErrors: [],
  error: ''
}

function reducer(state = initialState, action) {
  const { type, user, error } = action
  switch (type) {
    case Types.SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        user
      }
    case Types.SET_ERRORS:
      if (error.errors) {
        return { ...state, inputErrors: error.errors, error: '' }
      }
      if (error.message) {
        return { ...state, error: error.message, inputErrors: [] }
      }
      return state

    case Types.REMOVE_ERRORS:
      return { ...state, inputErrors: [], error: '' }
    default:
      return state
  }
}

export const AuthContext = createContext()

export function AuthProvider(props) {
  const [auth, dispatchAuth] = useReducer(reducer, initialState)
  const authService = useAuthService(auth, dispatchAuth)

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth, authService }}>
      {props.children}
    </AuthContext.Provider>
  )
}
