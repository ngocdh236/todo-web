import React, { createContext, useReducer } from 'react'

import { Types } from '../reducers/actionTypes'
import { lightTheme, darkTheme } from '../theme'

const initialState = {
  darkMode: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_DARK_THEME:
      return {
        darkMode: true
      }
    case Types.SET_LIGHT_THEME:
      return {
        darkMode: false
      }
    default:
      return state
  }
}

export const ThemeContext = createContext()

export function ThemeProvider(props) {
  const [theme, dispatchTheme] = useReducer(reducer, initialState)

  const root = document.documentElement

  const setLightTheme = () => {
    localStorage.theme = 'Light'
    dispatchTheme({
      type: Types.SET_LIGHT_THEME
    })
    for (var key in lightTheme) {
      root.style.setProperty(key, lightTheme[key])
    }
  }

  const setDarkTheme = () => {
    localStorage.theme = 'Dark'
    dispatchTheme({
      type: Types.SET_DARK_THEME
    })
    for (var key in darkTheme) {
      root.style.setProperty(key, darkTheme[key])
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setLightTheme, setDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
