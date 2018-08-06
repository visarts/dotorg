import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledListItem = styled.li`
  border-radius: 5px;
`

export const StyledListItemLink = styled(Link)`
  ${props => css`
    display: ${props.image ? 'flex' : 'block'};
    background-color: ${props.theme.colors.background.light2};
    color: ${props.theme.colors.foreground.darkest};
    transition: .2s all;
    &:hover {
      color: ${props.theme.colors.foreground.dark};
      background-color: ${props.theme.colors.background.light3};
    }
  `}
`

export const StyledListItemDesc = styled.div`
  display: flex;
  flex-direction: column;
  ${props => css`
    padding: ${props.theme.sizes.sm};
  `}
`
