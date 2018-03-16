import _ from 'lodash'
import { List, ListItem } from 'common/list/list.container'
import Typography from 'common/typography/typography.container'
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
            <Typography type="subtitle">{collection.name}</Typography>
            <List>
              {_.map(collection.items, (item, itemIndex) => (
                <ListItem
                  to={literatureService.getItemPath(creatorId, item.id)}
                  key={item.id}
                  primaryText={item.name}
                  secondaryText={`${creator.name.first} ${creator.name.last}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`}/>
              ))}
            </List>
          </div>
        )
      })}
    </div>
  )
}

export default CreatorComponent
