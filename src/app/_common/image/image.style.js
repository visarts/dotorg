import styled, { css } from 'styled-components'

export const StyledImage = styled.span`
  display: inline-block;
  position: relative;
  ${props => props.type === 'thumbnail' && css`
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
  `}
`

export const StyledImageSrc = styled.img`
  ${props => props.type === 'thumbnail' && css`
    width: 100%;
    position: absolute;
    clip: rect(0px,100px,100px,0px);
  `}
`
