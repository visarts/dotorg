import _ from 'lodash'
import {
  List,
  ListItem,
  Typography,
} from 'common'
import artworkService from 'Services/artwork.service'

const ArtworkCreator = props => {

  const creatorId = props.globalState.routing.collection
  const creator = artworkService.getCollection(creatorId)

  return (
    <div className="artwork_creator">
      <div className="section">
        <Typography type="subtitle">Gallery</Typography>
        <List>
          {_.map(creator.items, (item, itemIndex) => (
            <ListItem
              to={artworkService.getItemPath(creatorId, item.id)}
              key={itemIndex}
              image={{
                src: artworkService.getImagePathSm(creatorId, item.id),
                alt: item.title
              }}
              headline={item.name}
              subHeadline={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
          ))}
        </List>
      </div>
    </div>
  )
}

export default ArtworkCreator
