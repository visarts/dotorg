import styled, { css } from 'styled-components'

export const StyledTypography = styled(({ element, children }) => (
  React.createElement(element, null, children)
))`
  opacity: 1;
  transition: .2s all;
  ${props => props.type === 'listPrimary' && css`
    font-size: 1.2rem;
  `}
`
