import _ from 'lodash'
import { Link } from 'react-router-dom'
import literatureService from 'Services/literature.service'
import './literatureCreator.style.scss'

const CreatorComponent = (props) => {

  const creatorId = props.globalState.routing.collection
  const creator = literatureService.getCollection(creatorId)
  const groupedCreator = literatureService.getCreatorGroupedByCollections(creatorId)

  return (
    <div className="literature_creator">
      <h1>{creator.name.first} {creator.name.last}</h1>
      {_.map(groupedCreator, (collection, index) => {
        return (
          <div className="section" key={index}>
            <h2>{collection.name}</h2>
            <ul>
              {_.map(collection.items, (item, itemIndex) => (
                <li key={itemIndex} className="listItem">
                  <Link to={literatureService.getItemPath(creatorId, item.id)}>
                    {item.name} ({item.id.substring(item.id.lastIndexOf('-') + 1)})
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

export default CreatorComponent
