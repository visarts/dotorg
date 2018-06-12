import _ from 'lodash'
import {
  List,
  ListItem,
  Typography,
} from 'common'
import literatureService from 'Services/literature.service'
import './literatureCreator.style.scss'

const LiteratureCreator = (props) => {

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
              {_.map(collection.items, (item, itemIndex) => {
                const date = item.id.substring(item.id.lastIndexOf('-') + 1)
                return (
                  <ListItem
                    to={literatureService.getItemPath(creatorId, item.id)}
                    key={item.id}
                    headline={item.name}
                    subHeadline={`${creator.name.long}${date && `, ${date}`}`}/>
                )
              })}
            </List>
          </div>
        )
      })}
    </div>
  )
}

export default LiteratureCreator
