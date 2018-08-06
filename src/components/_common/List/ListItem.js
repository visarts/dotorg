import _ from 'lodash'
import { Typography, Image } from 'common'
import {
  StyledListItem,
  StyledListItemLink,
  StyledListItemDesc,
} from './List.style'

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

export default ListItem
