import styled, { css } from 'styled-components'

export const StyledTypography = styled(({element, children, type, ...other}) => {
  return React.createElement(element, {...other}, children)
})`
  opacity: 1;
  transition: .2s all;
  ${props => props.type === 'headline' && css`
    font-size: calc(1rem + 1vw);
  `}
  ${props => props.type === 'headlineLarge' && css`
    font-size: calc(1rem + 1vw + 10px);
  `}
  ${props => props.type ==='subheadline' && css`
    font-size: calc(.8rem + 1vw);
  `}
  ${props => props.type === 'listPrimary' && css`
    font-size: 1.2rem;
  `}
`
