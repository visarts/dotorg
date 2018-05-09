// import { Link } from 'react-router-dom'
import Typography from 'common/typography'
import './globalNav.style.scss'

const GlobalNavComponent = props => {
  const { navigation, globalState } = props
  const { routing } = globalState
  const visibilityClass = routing.section ? 'visible' : 'hidden'
  const getDescText = () => {
    let descText = ''
    if (routing.section) {
      if (routing.collection) {
        if (navigation.collection.type === 'category') {
          if (routing.section === 'artwork') {
            descText = `The ${navigation.collection.name} era`
          } else {
            descText = `Genre: ${navigation.collection.name}`
          }
        } else {
          descText = `${navigation.collection.name.first} ${navigation.collection.name.last}`
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
      <div className={`navigation container ${props.globalState.routing.section} ${visibilityClass}`}>
        <Typography type="title" className="nomargin">{getDescText()}</Typography>
      </div>
  )
}

export default GlobalNavComponent
