import { Types } from '.'
import { lightTheme, darkTheme } from '../theme'

let root = document.documentElement

export const setLightTheme = () => dispatch => {
  localStorage.theme = 'Light'
  dispatch(changeLightTheme())
  for (var key in lightTheme) {
    root.style.setProperty(key, lightTheme[key])
  }
}

export const setDarkTheme = () => dispatch => {
  localStorage.theme = 'Dark'
  dispatch(changeDarkTheme())
  for (var key in darkTheme) {
    root.style.setProperty(key, darkTheme[key])
  }
}

export const changeLightTheme = () => {
  return {
    type: Types.SET_LIGHT_THEME
  }
}

export const changeDarkTheme = () => {
  return {
    type: Types.SET_DARK_THEME
  }
}
