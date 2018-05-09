import { themeConfig } from './theme'
import { css } from 'styled-components'

// input any css arguments for small media views
export const smallScreen = (...args) => css`
  @media (max-width: ${themeConfig.breakpoints.md}) {
    ${css(...args)}
  }
`
export const globalGutters = () => {
  return `
    padding-left: ${themeConfig.spacing.globalGutter};
    padding-right: ${themeConfig.spacing.globalGutter};
    @media (max-width: ${themeConfig.breakpoints.md}) {
      padding-left: ${themeConfig.sizes.lg};
      padding-right: ${themeConfig.sizes.lg};
    }
  `
}

export const paddingHorizontal = size => {
  return `
    padding-top: ${themeConfig.sizes[size]}
    padding-bottom: ${themeConfig.sizes[size]}
  `
}
