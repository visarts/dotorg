import _ from 'lodash'
import {
  List,
  ListItem,
  Typography,
} from 'common'
import artworkService from 'Services/artwork.service'

const ArtworkCollection = props => {

  const collectionId = props.globalState.routing.collection
  // const collection = artworkService.getCollection(collectionId)
  const groupedCollection = artworkService.getCollectionGroupedByCreators(collectionId)
  console.log(groupedCollection)
  return _.map(groupedCollection, creator => (
      <div key={creator.name.short}>
        <Typography type="subtitle">{creator.name.long}</Typography>
        <List>
          {_.map(creator.items, item => (
            <ListItem
              to={artworkService.getItemPath(collectionId, item.id)}
              key={item.id}
              image={{
                src: artworkService.getImagePathSm(creator.id, item.id),
                alt: item.name.short,
              }}
              headline={item.name}
              subHeadline={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
          ))}
        </List>
      </div>
    ))
}

export default ArtworkCollection
