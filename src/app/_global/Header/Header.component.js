import Typography from 'common/typography'
import Favorite from 'material-ui-icons/Favorite'
import {
  StyledHeader,
  StyledHeaderNavigation,
  StyledHeaderNavigationLink,
  StyledHeaderNavigationIcon,
} from './Header.style'

const HeaderComponent = props => {
  const { navigationState, globalState } = props
  const { routing } = globalState

  return (
    <StyledHeader>
      <StyledHeaderNavigation>
        <StyledHeaderNavigationLink to={navigationState.root.fullPath}>
          <StyledHeaderNavigationIcon>
            <Favorite />
          </StyledHeaderNavigationIcon>
        </StyledHeaderNavigationLink>
        <StyledHeaderNavigationLink to={navigationState.root.fullPath}>
          <Typography type={routing.section ? 'headline' : 'headlineLarge'}>
            {navigationState.root.name}
          </Typography>
        </StyledHeaderNavigationLink>
        {navigationState.section.name &&
          <StyledHeaderNavigationLink to={navigationState.section.fullPath}>
            <Typography type="headline">
              {navigationState.section.name}
            </Typography>
          </StyledHeaderNavigationLink>
        }
      </StyledHeaderNavigation>
    </StyledHeader>
  )
}

export default HeaderComponent
