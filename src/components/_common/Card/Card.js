import { Link } from 'react-router-dom'
import { Typography } from 'common'

const Card = props => {
  return (
    <div className="cardComponent">
      <Link to={props.to || ''} className="cardComponent-link">
        <img
          className="cardComponent-image"
          src={props.image.src || ''}
          alt={props.image.alt || ''} />
        <div className="cardComponent-desc">
          <div className="cardComponent-desc-title">
            <Typography type="header">{props.title || ''}</Typography>
          </div>
          <div className="cardComponent-desc-primaryText">{props.primaryText || ''}</div>
          <div className="cardComponent-desc-secondaryText">{props.secondaryText || ''}</div>
        </div>
      </Link>
    </div>
  )
}

export default Card
