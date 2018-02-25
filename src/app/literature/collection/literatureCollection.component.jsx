import _ from 'lodash'
import { Link } from 'react-router-dom'
import literatureService from 'Services/literature.service'
import './literatureCollection.style.scss'

const CollectionComponent = (props) => {
  const collectionId = props.globalState.routing.collection
  const collection = literatureService.getCollection(collectionId)
  const groupedCollection = literatureService.getCollectionGroupedByCreators(collectionId)

  return (
    <div className="literature_collection">
      <h1>{collection.name}</h1>
      {_.map(groupedCollection, (creator, index) => {
        return (
          <div className="section" key={index}>
            <h2>{creator.name.last}</h2>
            <ul>
              {_.map(creator.items, (item, itemIndex) => (
                <li key={itemIndex} className="listItem">
                  <Link to={literatureService.getItemPath(collectionId, item.id)}>
                    {item.name}
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
