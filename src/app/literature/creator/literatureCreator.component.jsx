import _ from 'lodash'
import { List, ListItem } from 'common/list'
import Typography from 'common/typography'
import literatureService from 'Services/literature.service'
import './literatureCreator.style.scss'

const CreatorComponent = (props) => {

  const creatorId = props.globalState.routing.collection
  const creator = literatureService.getCollection(creatorId)
  const groupedCreator = literatureService.getCreatorGroupedByCollections(creatorId)

  return (
    <div className="literature_creator">
      {_.map(groupedCreator, (collection, index) => {
        return (
          <div className="section" key={collection.id}>
            <Typography type="subtitle">{collection.name.long}</Typography>
            <List>
              {_.map(collection.items, (item, itemIndex) => (
                <ListItem
                  to={literatureService.getItemPath(creatorId, item.id)}
                  key={item.id}
                  headline={item.name.long}
                  subHeadline={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`}/>
              ))}
            </List>
          </div>
        )
      })}
    </div>
  )
}

export default CreatorComponent
