import { SET_LIGHT_THEME, SET_DARK_THEME } from '../actions/types'

const lightTheme = {
  '--background-primary': '#fff',
  '--background-secondary': 'linear-gradient(to right, #c4e0e5, #4ca1af)',
  '--text-primary': '#000'
}

const darkTheme = {
  '--background-primary': '#222222',
  '--background-secondary': '#37474f',
  '--text-primary': '#fff'
}

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
    type: SET_LIGHT_THEME
  }
}

export const changeDarkTheme = () => {
  return {
    type: SET_DARK_THEME
  }
}
