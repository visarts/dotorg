import { Typography } from 'common'
import { StyledHomeSection, StyledHomeSubSection, StyledHomeSectionLink } from './Home.style'

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
          <StyledHomeSubSection>
            <Typography type="paragraph">This is the text that describes the artwork section in detail</Typography>
          </StyledHomeSubSection>
        </StyledHomeSectionLink>
      </StyledHomeSection>
      <StyledHomeSection>
        <StyledHomeSectionLink to="literature" section="literature">
          <Typography type="listPrimary">Literature</Typography>
          <StyledHomeSubSection>
            <Typography type="paragraph">This is the text that describes the artwork section in detail</Typography>
          </StyledHomeSubSection>
        </StyledHomeSectionLink>
      </StyledHomeSection>
    </div>
  )
}

export default Home
