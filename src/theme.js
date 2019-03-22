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

const buttonDanger = 'rgb(202, 92, 84)'
const buttonDone = 'gainsboro'
const shadowBlur = '15px'
const shadowColor = '#f5f5f5'

export const lightTheme = {
  '--background-primary': light.bgPrimary,
  '--background-secondary': light.bgSecondary,
  '--text-primary': light.textPrimary,
  '--text-secondary': light.textSecondary,
  '--box-shadow': `1px 0 ${shadowBlur} ${shadowColor}, 0 1px ${shadowBlur} ${shadowColor}, -1px 0 ${shadowBlur} ${shadowColor}, 0 -1px ${shadowBlur} ${shadowColor}`,
  '--button-danger': buttonDanger,
  '--button-done': buttonDone
}

export const darkTheme = {
  '--background-primary': dark.bgPrimary,
  '--background-secondary': dark.bgSecondary,
  '--text-primary': dark.textPrimary,
  '--button-danger': buttonDanger,
  '--button-done': buttonDone
}
