import { Link } from 'react-router-dom'
import { Typography } from 'common'
import './home.style.scss'

const HomeComponent = (/* props */) => {
  return (
    <div className="home">
      <Typography type="headline" gutterBottom>Welcome home</Typography>
      <div className="section">
        <div className="subSection">
          Portitude is the home of classic art and literature from around the world.
        </div>
        <div className="subSection">
          <Link to="artwork" className="subSection--link subSection--link--artwork">
            <Typography type="listPrimary">Artwork</Typography>
          </Link>
        </div>
        <div className="subSection">
          <Link to="literature" className="subSection--link subSection--link--literature">
            <Typography type="listPrimary">Literature</Typography>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
