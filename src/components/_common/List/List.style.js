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
  `}
`
