import { Typography } from 'common'
import Favorite from '@material-ui/icons/Favorite'
import {
  StyledHeader,
  StyledHeaderNavigation,
  StyledHeaderNavigationLink,
  StyledHeaderNavigationIcon,
} from './Header.style'

const Header = props => {
  const { routing, navigation } = props.globalState
  return (
    <StyledHeader isRoot={navigation.current === 'root'}>
      <StyledHeaderNavigation>
        <StyledHeaderNavigationLink to={navigation.root.fullPath}>
          <StyledHeaderNavigationIcon>
            <Favorite />
          </StyledHeaderNavigationIcon>
        </StyledHeaderNavigationLink>
        <StyledHeaderNavigationLink to={navigation.root.fullPath}>
          <Typography type={routing.section ? 'headline' : 'headlineLarge'}>
            {navigation.root.name}
          </Typography>
        </StyledHeaderNavigationLink>
        {navigation.section.name &&
          <StyledHeaderNavigationLink to={navigation.section.fullPath}>
            <Typography type="headline">
              {navigation.section.name}
            </Typography>
          </StyledHeaderNavigationLink>
        }
      </StyledHeaderNavigation>
    </StyledHeader>
  )
}

export default Header
