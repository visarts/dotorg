// import { Link } from 'react-router-dom'
import Typography from 'common/typography/typography.container'
import './globalNav.style.scss'

const GlobalNavComponent = props => {
  const { navigationData, globalState } = props
  const { routing } = globalState
  const visibilityClass = routing.section ? 'visible' : 'hidden'
  const getDescText = () => {
    let descText = ''
    if (routing.section) {
      if (routing.collection) {
        if (navigationData.collection.type === 'category') {
          if (routing.section === 'artwork') {
            descText = `The ${navigationData.collection.name} era`
          } else {
            descText = `Genre: ${navigationData.collection.name}`
          }
        } else {
          descText = `${navigationData.collection.name.first} ${navigationData.collection.name.last}`
        }
      } else {
        if (routing.section === 'artwork') {
          descText = 'The Portitude Art Gallery'
        } else {
          descText = 'The Portitude Library'
        }
      }
    }
    return descText
  }
  return (
    <div className="navigation">
      <div className={`container ${props.globalState.routing.section} ${visibilityClass}`}>
        <Typography type="title">{getDescText()}</Typography>
      </div>
    </div>
  )
}

export default GlobalNavComponent
