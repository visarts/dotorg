import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Favorite from 'material-ui-icons/Favorite'
import './globalHeader.style.scss'

const GlobalHeaderComponent = (props) => {
  const { navigationData } = props
  return (
    <div className="header">
      <div className="header--navigation">
        <Link to={navigationData.root.fullPath} className="header--navigation--item">
          <Typography variant="headline"><Favorite /> {navigationData.root.name}</Typography>
        </Link>
        {navigationData.section.name &&
          <Link to={navigationData.section.fullPath} className="header--navigation--item">
            <h1>{navigationData.section.name}</h1>
          </Link>
        }
        {navigationData.collection.name &&
          <Link to={navigationData.collection.fullPath} className="header--navigation--item">
            <h1>{navigationData.collection.name}</h1>
          </Link>
        }
        {navigationData.item.name &&
          <Link to={navigationData.item.fullPath} className="header--navigation--item">
            <h1>{navigationData.item.name}</h1>
          </Link>
        }
      </div>
    </div>
  )
}

export default GlobalHeaderComponent
