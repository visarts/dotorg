import _ from 'lodash'
import { List, ListItem } from 'common/list/list.container'
import Typography from 'common/typography/typography.container'
import artworkService from 'Services/artwork.service'
import './artworkCollection.style.scss'

const CollectionComponent = (props) => {

  const collectionId = props.globalState.routing.collection
  // const collection = artworkService.getCollection(collectionId)
  const groupedCollection = artworkService.getCollectionGroupedByCreators(collectionId)

  return (
    <div className="artwork_collection">
      {_.map(groupedCollection, (creator, index) => {
        return (
          <div className="section" key={index}>
            <Typography type="subtitle">{creator.name.last}</Typography>
            <List>
              {_.map(creator.items, (item, itemIndex) => (
                <ListItem
                  to={artworkService.getItemPath(collectionId, item.id)}
                  key={itemIndex}
                  image={{
                    src: artworkService.getImagePathSm(creator.id, item.id),
                    alt: item.name
                  }}
                  primaryText={item.name}
                  secondaryText={`${creator.name.first} ${creator.name.last}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
              ))}
            </List>
          </div>
        )
      })}
    </div>
  )
}

export default CollectionComponent
