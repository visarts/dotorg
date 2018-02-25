import _ from 'lodash'
import { Link } from 'react-router-dom'
import artworkService from 'Services/artwork.service'
import './artworkCreator.style.scss'

const CreatorComponent = (props) => {

  const creatorId = props.globalState.routing.collection
  const creator = artworkService.getCollection(creatorId)

  return (
    <div className="artwork_creator">
      <h1>{creator.name.first} {creator.name.last}</h1>
      <div className="section">
        <h2>Gallery</h2>
        <ul>
          {_.map(creator.items, (item, itemIndex) => (
            <li key={itemIndex}>
              <Link to={artworkService.getItemPath(creatorId, item.id)} className="thumbContainer">
                <img
                  src={artworkService.getImagePathSm(creatorId, item.id)}
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
    </div>
  )
}

export default CreatorComponent
