import React from 'react'
import _ from 'lodash'
import { Typography, Image } from 'common'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const StyledListItem = styled.li`
  border-radius: 5px;
`

const StyledListItemLink = styled(Link)`
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

const StyledListItemDesc = styled.div`
  display: flex;
  flex-direction: column;
  ${props => css`
    padding: ${props.theme.sizes.sm};
  `}
`


const ListItem = props => {
  const truncateLength = window.innerWidth > 768 ? 190 : 100
  if (props.to) {
    return (
      <StyledListItem>
        <StyledListItemLink to={props.to} image={props.image}>
          {props.image &&
            <Image
              type="thumbnail"
              src={props.image.src}
              default={props.image.default}
              alt={props.image.alt || props.image.src} />
          }
          <StyledListItemDesc>
            {props.headline && <Typography type="listPrimary">{props.headline}</Typography>}
            {props.subHeadline && <Typography type="listSecondary">{props.subHeadline}</Typography>}
            {props.primaryText && <Typography type="listSecondary">{_.truncate(props.primaryText, { length: truncateLength, separator: ' ' })}</Typography>}
          </StyledListItemDesc>
        </StyledListItemLink>
      </StyledListItem>
    )
  } else {
    return (
      <StyledListItem key={props.key || 0}>
        {props.headline && <Typography type="listPrimary">{props.headline}</Typography>}
        {props.subHeadline && <Typography type="listSecondary">{props.subHeadline}</Typography>}
      </StyledListItem>
    )
  }
}

function List (props) {
  return (
    <ul>
      {props.children}
    </ul>
  )
}

export default List
export { ListItem }
