const sizes = {
  xs: '5px',
  sm: '10px',
  md: '15px',
  lg: '20px',
  xl: '35px',
  rel: {
    [10]: '10vw',
    [15]: '15vw',
    [20]: '20vw',
  },
  containers: {
    footerHeight: '150px',
    headerHeight: '65px',
  }
}

const spacing = {
  globalGutter: sizes.rel[10],
  globalGutter_sm: sizes.lg,
}

const breakpoints = {
  sm: '376px',
  md: '768px',
}

const layers = {
  header: 1,
  footer: 1,
  modal: 2,
}

const boxShadows = {
  [10]: '0px 0px 10px rgba(0, 0, 0, .5)',
  [20]: '0px 0px 20px rgba(0, 0, 0, .5)',
}

export const themeConfig = {
  colors: {
    foreground: {
      light: '#DFDFDF',
      light2: '#CFCFCF',
      dark: '#5A5A55',
      dark2: '#6E6E66',
      darkest: '#424242',
    },
    background: {
      light: '#afafaa',
      dark: '#363630',
      darker: '#181615',
    },
    accent: {
      purple: '#4c2950',
      blue: '#333a4f',
    },
  },
  sizes,
  spacing,
  breakpoints,
  layers,
  boxShadows,
}
