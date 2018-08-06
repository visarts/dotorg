import styled, { css } from 'styled-components'

export const StyledLiteratureItemContent = styled.div`
  font-size: 1.1em;
  ${props => css`
    ${props.firstPage && css`
      &::first-letter {
        float: left;
        font-size: 3em;
        line-height: 1;
        padding-right: 2px;
      }
    `}
  `}
`
