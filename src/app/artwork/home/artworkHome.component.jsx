import { Link } from 'react-router-dom'
import artworkService from 'Services/artwork.service'
import './artworkHome.style.scss'

const HomeComponent = (props) => {

  const collections = artworkService.getAllCollectionsMetaData()
  const creators = artworkService.getAllCreatorsMetaData()

  return (
    <div className="artwork_home">
      <h1>Artwork Home</h1>
      <div>
        <h1>Eras</h1>
        <div className="artwork_eras">
          <ul>
            {_.map(collections, (collection, index) => (
              <li key={index} className="listItem">
                <Link to={artworkService.getCollectionPath(collection.id)}>{collection.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h1>Artists</h1>
        <div className="artwork_artists">
          <ul>
            {_.map(creators, (creator, index) => (
              <li key={index} className="listItem">
                <Link to={artworkService.getCollectionPath(creator.id)}>{creator.name.last}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
