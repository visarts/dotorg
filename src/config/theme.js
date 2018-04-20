const padding = {
  sm: '.35rem',
  md: '.75rem',
  lg: '1.5rem',
  xl: '7.5rem',
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
    },
    accent: {
      purple: '#4c2950',
      blue: '#333a4f',
    },
  },
  spacing: {
    globalGutter: padding.rel[10],
    globalGutter_sm: padding.lg,
  }
}
