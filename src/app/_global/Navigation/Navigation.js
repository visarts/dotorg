// import { Link } from 'react-router-dom'
import Typography from 'common/typography'
import { StyledNav } from './Navigation.style'

const Navigation = props => {
  const { routing, navigation } = props.globalState

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
    <StyledNav section={routing.section}>
      <Typography type="title">{getDescText()}</Typography>
    </StyledNav>
  )
}

export default Navigation
