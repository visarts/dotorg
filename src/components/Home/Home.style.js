import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const StyledHomeSection = styled.div`
  max-width: 400px;
  margin-right: 15px;
  margin-bottom: 15px;
`

export const StyledHomeSectionLink = styled(Link)`
  display: inline-flex;
  width: 100%;
  ${props => css`
    padding: ${props.theme.sizes.sm};
    color: ${props.theme.colors.foreground.light};
    background: ${props.section === 'artwork'
      ? props.theme.colors.accent.purple
      : props.theme.colors.accent.blue};
  `}
`
