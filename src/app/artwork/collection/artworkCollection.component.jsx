import { Link } from 'react-router-dom'
import artworkService from 'Services/artwork.service'
import './artworkCollection.style.scss'

const CollectionComponent = (props) => {

  const collectionId = props.globalState.routing.collection
  const collection = artworkService.getCollection(collectionId)
  const groupedCollection = artworkService.getCollectionGroupedByCreators(collectionId)

  return (
    <div className="artwork_collection">
      <h1>{collection.name}</h1>
      {_.map(groupedCollection, (creator, index) => {
        return (
          <div className="section" key={index}>
            <h2>{creator.name.last}</h2>
            <ul>
              {_.map(creator.items, (item, itemIndex) => (
                <li key={itemIndex} className="listItem">
                  <Link to={artworkService.getItemPath(collectionId, item.id)} className="thumbContainer">
                    <img
                      src={artworkService.getImagePathSm(creator.id, item.id)}
                      className="thumbContainer--image"
                      alt={item.title} />
                    <span className="thumbContainer--text">
                      {item.name} ({item.id.substring(item.id.lastIndexOf('-') + 1)})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default CollectionComponent
