const padding = {
  xs: '5px',
  sm: '10px',
  md: '15px',
  lg: '20px',
  xl: '35px',
  rel: {
    [10]: '10vw',
    [15]: '15vw',
    [20]: '20vw',
  }
}

export const themeConfig = {
  colors: {
    foreground: {
      light: '#DFDFDF',
      light2: '#CFCFCF',
      dark: '#5A5A55',
      dark2: '#6E6E66',
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
  padding,
  spacing: {
    globalGutter: padding.rel[10],
    globalGutter_sm: padding.lg,
    globalFooterHeight: '150px'
  }
}
