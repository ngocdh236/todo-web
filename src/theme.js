const light = {
  bgPrimary: 'white',
  bgSecondary: 'gainsboro',
  colorPrimary: 'black',
  colorSecondary: '#7a7a7a',
  colorLight: '#f8f9fa',
  shadowColor: '#f5f5f5'
}

const dark = {
  bgPrimary: '#1c1c1c',
  bgSecondary: '#3a3a3a',
  colorPrimary: 'gray',
  colorSecondary: 'gainsboro',
  colorLight: '#7a7a7a',
  shadowColor: 'gray'
}

const colorDanger = '#dc3545'
const shadowBlur = '5px'

export const lightTheme = {
  '--color-mode': 'black',

  '--background-primary': light.bgPrimary,
  '--background-secondary': light.bgSecondary,

  '--color-primary': light.colorPrimary,
  '--color-secondary': light.colorSecondary,
  '--color-light': light.colorLight,
  '--color-danger': colorDanger,

  '--border': 'none',
  '--box-shadow': `1px 0 ${shadowBlur} ${
    light.shadowColor
  }, 0 1px ${shadowBlur} ${light.shadowColor}, -1px 0 ${shadowBlur} ${
    light.shadowColor
  }, 0 -1px ${shadowBlur} ${light.shadowColor}`
}

export const darkTheme = {
  '--color-mode': 'white',

  '--background-primary': dark.bgPrimary,
  '--background-secondary': dark.bgSecondary,

  '--color-primary': dark.colorPrimary,
  '--color-secondary': dark.colorSecondary,
  '--color-light': dark.colorLight,
  '--color-danger': colorDanger,

  '--border': '1px solid var(--background-secondary)',
  '--box-shadow': 'none'
}
