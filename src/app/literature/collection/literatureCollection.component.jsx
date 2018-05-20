import _ from 'lodash'
import {
  List,
  ListItem,
  Typography,
} from 'common'
import literatureService from 'Services/literature.service'
import './literatureCollection.style.scss'

const CollectionComponent = (props) => {
  const collectionId = props.globalState.routing.collection
  // const collection = literatureService.getCollection(collectionId)
  const groupedCollection = literatureService.getCollectionGroupedByCreators(collectionId)

  return (
    <div className="literature_collection">
      {_.map(groupedCollection, (creator, index) => {
        return (
          <div className="section" key={index}>
            <Typography type="subtitle">{creator.name.short}</Typography>
            <List>
              {_.map(creator.items, (item, itemIndex) => (
                <ListItem
                  to={literatureService.getItemPath(collectionId, item.id)}
                  key={itemIndex}
                  headline={item.name}
                  subHeadline={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
              ))}
            </List>
          </div>
        )
      })}
    </div>
  )
}

export default CollectionComponent
