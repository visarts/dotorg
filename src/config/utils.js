import { themeConfig } from './theme'

export const globalGutters = () => {
  return `
    padding-left: ${themeConfig.spacing.globalGutter};
    padding-right: ${themeConfig.spacing.globalGutter};
  `
}

export const paddingHorizontal = size => {
  return `
    padding-top: ${themeConfig.padding[size]}
    padding-bottom: ${themeConfig.padding[size]}
  `
}
