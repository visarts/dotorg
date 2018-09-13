import { Typography } from 'common'
import { StyledHomeSection, StyledHomeSectionLink } from './Home.style'

const Home = props => {
  return (
    <div className="home">
      <Typography type="headline" gutterBottom>Welcome home</Typography>
      <StyledHomeSection>
        Portitude is the home of classic art and literature from around the world.
      </StyledHomeSection>
      <StyledHomeSection>
        <StyledHomeSectionLink to="artwork" section="artwork">
          <Typography type="listPrimary">Artwork</Typography>
        </StyledHomeSectionLink>
      </StyledHomeSection>
      <StyledHomeSection>
        <StyledHomeSectionLink to="literature" section="literature">
          <Typography type="listPrimary">Literature</Typography>
        </StyledHomeSectionLink>
      </StyledHomeSection>
    </div>
  )
}

export default Home
