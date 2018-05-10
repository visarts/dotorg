// import { Link } from 'react-router-dom'
import Typography from 'common/typography'
import { StyledNav } from './Navigation.style'

const Navigation = props => {
  const { routing, navigation } = props.globalState

  const current = navigation[navigation.current]
  const title = current.name.last ? `${current.name.first} ${current.name.last}` : current.name

  return (
    <StyledNav section={routing.section}>
      <Typography type="title">
        {title}
      </Typography>
    </StyledNav>
  )
}

export default Navigation
