const light = {
  bgPrimary: 'white',
  bgSecondary: 'linear-gradient(to right, #c4e0e5, #4ca1af)',
  textPrimary: 'black',
  textSecondary: 'gainsboro'
}

const dark = {
  bgPrimary: '#222222',
  bgSecondary: '#37474f',
  textPrimary: 'white'
}

const shadowBlur = '15px'
const shadowColor = '#f5f5f5'
const colorDanger = '#dc3545'
const colorLight = '#f8f9fa'
const colorSecondary = 'gainsboro'

export const lightTheme = {
  '--background-primary': light.bgPrimary,
  '--background-secondary': light.bgSecondary,
  '--text-primary': light.textPrimary,
  '--text-secondary': light.textSecondary,
  '--color-danger': colorDanger,
  '--color-light': colorLight,
  '--color-secondary': colorSecondary,
  '--box-shadow': `1px 0 ${shadowBlur} ${shadowColor}, 0 1px ${shadowBlur} ${shadowColor}, -1px 0 ${shadowBlur} ${shadowColor}, 0 -1px ${shadowBlur} ${shadowColor}`
}

export const darkTheme = {
  '--background-primary': dark.bgPrimary,
  '--background-secondary': dark.bgSecondary,
  '--color-danger': colorDanger,
  '--color-light': colorLight,
  '--color-secondary': colorSecondary,
  '--text-primary': dark.textPrimary
}
