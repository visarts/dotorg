import { Link } from 'react-router-dom'
import Typography from 'common/typography.container'

const ListItemComponent = props => {
  const className = `list-item ${props.className || ''}`
  if (props.to) {
    return (
      <li className={className}>
        <Link to={props.to} className="list-item--link">
          {props.image && <img src={props.image.src} className="list-item--image" alt={props.image.alt || props.image.src} />}
          {props.primaryText && <Typography type="listPrimary">{props.primaryText}</Typography>}
          {props.secondaryText && <Typography type="listSecondary">{props.secondaryText}</Typography>}
        </Link>
      </li>
    )
  } else {
    return (
      <li className={className}>
        {props.primaryText && <Typography type="listPrimary">{props.primaryText}</Typography>}
        {props.secondaryText && <Typography type="listSecondary">{props.secondaryText}</Typography>}
      </li>
    )
  }
}

export default ListItemComponent
