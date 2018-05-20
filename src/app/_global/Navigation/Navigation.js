// import { Link } from 'react-router-dom'
import { Typography } from 'common'
import { StyledNav } from './Navigation.style'

const Navigation = props => {
  const { routing, navigation } = props.globalState
  const current = navigation[navigation.current]

  return (
    <StyledNav section={routing.section}>
      <Typography type="title">
        {current.name}
      </Typography>
    </StyledNav>
  )
}

export default Navigation
