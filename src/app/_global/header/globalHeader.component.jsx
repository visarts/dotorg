import { Link } from 'react-router-dom'
import Typography from 'common/typography/typography.container'
import Favorite from 'material-ui-icons/Favorite'
import './globalHeader.style.scss'

const GlobalHeaderComponent = props => {
  const { navigationData } = props

  return (
    <div className="header">
      <div className="header-navigation">
        <Link to={navigationData.root.fullPath} className="header-navigation-item">
          <Typography type="headline">
            <span className="header-navigation-icon"><Favorite /></span>
            {navigationData.root.name}
          </Typography>
        </Link>
        {navigationData.section.name &&
          <Link to={navigationData.section.fullPath} className="header-navigation-item">
            <Typography type="headline">
              {navigationData.section.name}
            </Typography>
          </Link>
        }
        {navigationData.collection.name &&
          <Link to={navigationData.collection.fullPath} className="header-navigation-item">
            <Typography type="subheadline">{navigationData.collection.name}</Typography>
          </Link>
        }
        {navigationData.item.name && false &&
          <Link to={navigationData.item.fullPath} className="header-navigation-item">
            <h1>{navigationData.item.name}</h1>
          </Link>
        }
      </div>
    </div>
  )
}

export default GlobalHeaderComponent
