import { Link } from 'react-router-dom'
import Typography from 'common/typography/typography.container'

const ListItemComponent = props => {
  const className = `list-item ${props.className || ''}`
  if (props.to) {
    return (
      <li className={className} key={props.key || 0}>
        <Link to={props.to} className={`${props.image ? 'list-item-link list-item-link--thumbnail' : 'list-item-link'}`}>
          {props.image && <img src={props.image.src} className="list-item-image" alt={props.image.alt || props.image.src} />}
          <div className="list-item-desc">
            {props.primaryText && <Typography type="listPrimary" className={props.image && 'list-item-text'}>{props.primaryText}</Typography>}
            {props.secondaryText && <Typography type="listSecondary" className={props.image && 'list-item-text'}>{props.secondaryText}</Typography>}
          </div>
        </Link>
      </li>
    )
  } else {
    return (
      <li className={className} key={props.key || 0}>
        {props.primaryText && <Typography type="listPrimary">{props.primaryText}</Typography>}
        {props.secondaryText && <Typography type="listSecondary">{props.secondaryText}</Typography>}
      </li>
    )
  }
}

export default ListItemComponent
