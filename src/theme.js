const colorDanger = '#dc3545'

const light = Object.freeze({
  colorButtonMode: 'black',
  bgPrimary: 'white',
  bgSecondary: 'gainsboro',
  colorPrimary: 'black',
  colorSecondary: '#7a7a7a',
  colorLight: '#f8f9fa',
  border: 'none',
  boxShadow: `1px 0 5px #f5f5f5, 0 1px 5px #f5f5f5, -1px 0 5px #f5f5f5, 0 -1px 5px #f5f5f5`
})

const dark = Object.freeze({
  colorButtonMode: 'white',
  bgPrimary: '#1c1c1c',
  bgSecondary: '#3a3a3a',
  colorPrimary: 'gray',
  colorSecondary: 'gainsboro',
  colorLight: '#7a7a7a',
  border: '1px solid var(--background-secondary)',
  boxShadow: 'none'
})

const theme = theme =>
  Object.freeze({
    '--color-button-mode': theme.colorButtonMode,

    '--background-primary': theme.bgPrimary,
    '--background-secondary': theme.bgSecondary,

    '--color-primary': theme.colorPrimary,
    '--color-secondary': theme.colorSecondary,
    '--color-light': theme.colorLight,
    '--color-danger': colorDanger,

    '--border': theme.border,
    '--box-shadow': theme.boxShadow
  })

export const lightTheme = theme(light)
export const darkTheme = theme(dark)
