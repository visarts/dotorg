import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Typography, Image } from 'common'

const ListItem = props => {
  const truncateLength = window.innerWidth > 768 ? 220 : 100
  if (props.to) {
    return (
      <li className={`list-item ${props.className || ''}`}>
        <Link to={props.to} className={`${props.image ? 'list-item-link list-item-link--thumbnail' : 'list-item-link'}`}>
          {props.image &&
            <Image
              type="thumbnail"
              src={props.image.src}
              default={props.image.default}
              alt={props.image.alt || props.image.src} />
          }
          <div className="list-item-desc">
            {props.headline && <Typography type="listPrimary">{props.headline}</Typography>}
            {props.subHeadline && <Typography type="listSecondary">{props.subHeadline}</Typography>}
            {props.primaryText && <Typography type="listSecondary">{_.truncate(props.primaryText, { length: truncateLength, separator: ' ' })}</Typography>}
          </div>
        </Link>
      </li>
    )
  } else {
    return (
      <li key={props.key || 0}>
        {props.headline && <Typography type="listPrimary">{props.headline}</Typography>}
        {props.subHeadline && <Typography type="listSecondary">{props.subHeadline}</Typography>}
      </li>
    )
  }
}

export default ListItem
