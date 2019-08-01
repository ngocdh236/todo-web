import React, { createContext, useReducer } from 'react'

import { Types } from '../reducers/actionTypes'
import { isEmpty } from '../utils/isEmpty'
import { useAuthService } from '../services/authService'

const initialState = {
  isAuthenticated: false,
  user: {}
}

function reducer(state = initialState, action) {
  const { user } = action
  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        user
      }
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
