import { Link } from 'react-router-dom'
import Typography from 'common/typography'
import Favorite from 'material-ui-icons/Favorite'
import './globalHeader.style.scss'

const HeaderComponent = props => {
  const { navigationData, globalState } = props
  const { routing } = globalState
  const levels = {
    root: routing.section && routing.collection ? '.55' : routing.section ? '.7' : '1',
    section: routing.collection ? '.8' : '1'
  }

  return (
    <div className="header">
      <ul className="header-navigation">
        <li>
          <Link to={navigationData.root.fullPath} className="header-navigation-item">
            <span className="header-navigation-icon"><Favorite /></span>
            <Typography type={routing.section ? 'headline' : 'headlineLarge'} style={{opacity: levels.root}}>
              {navigationData.root.name}
            </Typography>
          </Link>
        </li>
        {navigationData.section.name &&
          <li>
            <Link to={navigationData.section.fullPath} className="header-navigation-item">
              <Typography type="headline" style={{opacity: levels.section}}>
                {navigationData.section.name}
              </Typography>
            </Link>
          </li>
        }
        {navigationData.collection.name &&
          <li>
            <Link to={navigationData.collection.fullPath} className="header-navigation-item">
              <Typography type="headline">{navigationData.collection.type === 'category' ? navigationData.collection.name : navigationData.collection.name.last}</Typography>
            </Link>
          </li>
        }
        {navigationData.item.name && false &&
          <li>
            <Link to={navigationData.item.fullPath} className="header-navigation-item">
              <h1>{navigationData.item.name}</h1>
            </Link>
          </li>
        }
      </ul>
    </div>
  )
}

export default HeaderComponent
