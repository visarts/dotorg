// import { Link } from 'react-router-dom'
import Typography from 'common/typography'
import { StyledNav } from './Navigation.style'

const Navigation = props => {
  const { routing, navigation } = props.globalState

  const current = navigation[navigation.current]
  console.log(current)
  return (
    <StyledNav section={routing.section}>
      <Typography type="title">
        {current.name}
      </Typography>
    </StyledNav>
  )
}

export default Navigation
