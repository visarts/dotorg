import _ from 'lodash'
import { Link } from 'react-router-dom'
import Typography from 'common/typography/typography.container'
import literatureService from 'Services/literature.service'
import './literatureHome.style.scss'

const HomeComponent = (/* props */) => {

  const collections = literatureService.getAllCollectionsMetaData()
  const creators = literatureService.getAllCreatorsMetaData()

  return (
    <div className="literature_home">
      <div>
        <Typography type="subtitle">Genres</Typography>
        <div className="literature_genres">
          <ul>
            {_.map(collections, (collection, index) => (
              <li key={index} className="listItem">
                <Link to={literatureService.getCollectionPath(collection.id)}>{collection.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Typography type="subtitle">Titles</Typography>
        <div className="literature_authors">
          <ul>
            {_.map(creators, (creator, index) => (
              <li key={index} className="listItem">
                <Link to={literatureService.getCollectionPath(creator.id)}>{creator.name.last}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
