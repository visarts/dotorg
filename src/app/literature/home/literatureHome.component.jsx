import _ from 'lodash'
import { List, ListItem } from 'common/list/list.container'
import Typography from 'common/typography/typography.container'
import literatureService from 'Services/literature.service'
import './literatureHome.style.scss'

const HomeComponent = (/* props */) => {

  const collections = literatureService.getAllCollectionsMetaData()
  const creators = literatureService.getAllCreatorsMetaData()

  return (
    <div className="literature_home">
      <div>
        <Typography type="subtitle">Genres</Typography>
        <div className="literature_genres">
          <List>
            {_.map(collections, (collection, index) => (
              <ListItem
                to={literatureService.getCollectionPath(collection.id)}
                primaryText={collection.name}
                key={index} />
            ))}
          </List>
        </div>
      </div>
      <div>
        <Typography type="subtitle">Authors</Typography>
        <div className="literature_authors">
          <List>
            {_.map(creators, (creator, index) => (
              <ListItem
                to={literatureService.getCollectionPath(creator.id)}
                primaryText={creator.name.last}
                key={index} />
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
